import Web3 from "web3";
import BigNumber from "big-number";

import Token from "../abis/PIMIToken.json";
import Farm from "../abis/PixelMine.json";
import BusdToken from "../abis/BusdToken.json";

import {
  Transaction,
  Square,
  Charity,
  ORE,
  Donation,
} from "./types/contract";
import {
  Inventory,
  ItemName,
  Recipe,
  items,
  DEFAULT_INVENTORY,
} from "./types/crafting";
import { onboarded } from "./utils/localStorage";
import { getUpgradePrice } from "./utils/land";
import { resolve } from "path";
import { rejects } from "assert";

interface Account {
  farm: Square[];
  balance: number;
  id: string;
}

type Contracts = Record<ItemName, any>;

export const MINIMUM_GAS_PRICE = 40;
const SAVE_OFFSET_SECONDS = 5;

export class BlockChain {
  private web3: Web3 | null = null;
  private token: any | null = null;
  private alchemyToken: any | null = null;
  private farm: any | null = null;
  private chickens: any | null = null;
  private alchemyFarm: any | null = null;
  private account: string | null = null;
  private busdToken: any | null = null;

  private details: Account = null;
  private inventory: Inventory = null;
  private totalItemSupplies: Inventory = null;
  private stoneStrength: number = 0;
  private ironStrength: number = 0;
  private goldStrength: number = 0;
  private woodStrength: number = 0;
  private eggCollectionTime: number = 0;

  private events: Transaction[] = [];

  private contracts: Contracts;

  private saveCount: number = 0;

  private isTrialAccount: boolean = false;

  private tokenAddress = "0xA959A0b7B47b6Fb8404713f51f66ABffEc45376a";
  private farmAddress = "0xCe101d9bD17a6C18c3a0fef1E2578be64Ad720F0";

  private async connectToBinance() {
    try {
      this.token = new this.web3.eth.Contract(
        Token as any,
        this.tokenAddress
      );
      this.farm = new this.web3.eth.Contract(
        Farm as any,
        this.farmAddress
      );
      const binanceAccounts = await this.web3.eth.getAccounts();
      this.account = binanceAccounts[0];

      this.contracts = items
        .filter((item) => !!item.abi)
        .reduce(
          (contracts, item) => ({
            ...contracts,
            [item.name]: new this.web3.eth.Contract(
              item.abi as any,
              item.address
            ),
          }),
          {} as Contracts
        );

      this.alchemyToken = new this.web3.eth.Contract(
        Token as any,
        this.tokenAddress
      );
      this.alchemyFarm = new this.web3.eth.Contract(
        Farm as any,
        this.farmAddress
      );
    } catch (e) {
      // Timeout, retry
      if (e.code === "-32005") {
        console.error("Retrying...");
        await new Promise((res) => window.setTimeout(res, 3000));
      } else {
        console.error(e);
        throw e;
      }
    }
  }

  public get isConnected() {
    return this.isTrial || !!this.farm;
  }

  public get hasFarm() {
    return this.details && this.details.farm.length > 0;
  }

  public get myFarm() {
    return this.details;
  }

  private async setupWeb3() {
    if ((window as any).ethereum) {
      try {
        // Request account access if needed
        await (window as any).ethereum.enable();
        this.web3 = new Web3((window as any).ethereum);
      } catch (error) {
        // User denied account access...
        console.error(error);
      }
    } else if ((window as any).web3) {
      this.web3 = new Web3((window as any).web3.currentProvider);
    } else {
      throw new Error("NO_WEB3");
    }
  }

  public async initialise(retryCount = 0) {
    this.saveCount = 0;

    try {
      // It is actually quite fast, we won't to simulate slow loading to convey complexity
      await new Promise((res) => window.setTimeout(res, 1000));
      await this.setupWeb3();
      this.oldInventory = null;
      const chainId = await this.web3.eth.getChainId();

      if (chainId === 43113) {
        await this.connectToBinance();

        await this.loadFarm();
      } else {
        throw new Error("WRONG_CHAIN");
      }
    } catch (e) {
      // If it is not a known error, keep trying
      if (
        retryCount < 3 &&
        e.message !== "WRONG_CHAIN" &&
        e.message !== "NO_WEB3"
      ) {
        await new Promise((res) => setTimeout(res, 2000));

        return this.initialise(retryCount + 1);
      }
      console.error(e);
      throw e;
    }
  }

  public async loadFarm() {
    const [account, inventory, itemSupplies] = await Promise.all([
      this.getAccount(),
      this.loadInventory(),
      this.loadTotalItemSupplies(),
    ]);
    this.details = account;
    this.inventory = inventory;
    this.totalItemSupplies = itemSupplies;

    await this.cacheTotalSupply();
  }

  private async waitForFarm(retryCount: number = 1) {
    const wait = retryCount * 1000;
    await new Promise((res) => setTimeout(res, wait));
    const farm = await this.farm.methods
      .getLand(this.account)
      .call({ from: this.account });

    if (!farm || !farm.length) {
      await this.waitForFarm(retryCount + 1);
    }
  }

  public async createFarm(donation: Donation) {
    const value = this.web3.utils.toWei(donation.value, "ether");

    await new Promise(async (resolve, reject) => {
      const gasPrice = await this.estimate();

      this.farm.methods
        .createMiningFarm()
        .send({
          from: this.account,
          value,
          to: donation.charity,
          gasPrice,
        })
        .on("error", function (error) {
          reject(error);
        })
        .on("transactionHash", function (transactionHash) {
          console.log({ transactionHash });
        })
        .on("receipt", async function (receipt) {
          resolve(receipt);
        });
    });

    await this.waitForFarm();

    await this.loadFarm();
  }

  public async save() {
    const blockChain = this;
    console.log(this.saveCount);

    if (this.isTrial) {
      throw new Error("TRIAL_MODE");
    }

    // If this is second save, put a buffer between the saves to ensure blockchain state does overlap
    if (this.saveCount > 0) {
      await new Promise((res) =>
        setTimeout(res, 1000 * SAVE_OFFSET_SECONDS)
      );
    } else {
      // First save
      // For each event, subtract 5 seconds to ensure we are not ahead of the Blockchain timestamp
      this.events = this.events.map((event) => ({
        ...event,
        createdAt: event.createdAt - SAVE_OFFSET_SECONDS,
      }));
    }

    console.log(this.events);

    await new Promise(async (resolve, reject) => {
      const gasPrice = await this.estimate();

      this.farm.methods
        .sync(this.events)
        .send({ from: this.account, gasPrice })
        .on("error", function (error) {
          console.log({ error });

          // User rejected
          if (error.code === 4001) {
            return resolve(null);
          }

          reject(error);
        })
        .on("transactionHash", function (transactionHash) {
          console.log({ transactionHash });
        })
        .on("receipt", function (receipt) {
          console.log({ receipt });
          blockChain.events = [];
          resolve(receipt);
        });
    });

    onboarded();
    this.saveCount += 1;
  }

  public async estimate(incr = 1) {
    const e = await this.web3.eth.getGasPrice();
    console.log({ e });
    let gasPrice = e ? Number(e) * incr : undefined;
    const minimum = MINIMUM_GAS_PRICE * 1000000000;
    console.log({ gasPrice, minimum });
    if (!gasPrice || gasPrice < minimum) {
      gasPrice = minimum;
    }
    return gasPrice;
  }

  public async levelUp() {
    if (this.isTrial) {
      throw new Error("TRIAL_MODE");
    }

    await new Promise(async (resolve, reject) => {
      const gasPrice = await this.estimate();

      this.farm.methods
        .levelUp()
        .send({ from: this.account, gasPrice })
        .on("error", function (error) {
          console.log({ error });
          // User rejected
          if (error.code === 4001) {
            return resolve(null);
          }
          reject(error);
        })
        .on("transactionHash", function (transactionHash) {
          console.log({ transactionHash });
        })
        .on("receipt", async function (receipt) {
          console.log({ receipt });
          resolve(receipt);
        });
    });

    const price = getUpgradePrice({
      totalSupply: this.totalSupply(),
      farmSize: this.details.farm.length,
    });

    this.details = {
      ...this.details,
      balance: this.details.balance - price,
      farm: [
        ...this.details.farm,
        { createdAt: 0, fruit: ORE.Stone },
        { createdAt: 0, fruit: ORE.Stone },
        { createdAt: 0, fruit: ORE.Stone },
      ],
    };
  }

  private async getAccount(): Promise<Account> {
    if (!this.web3 || this.isTrial) {
      return {
        farm: [
          {
            createdAt: 0,
            fruit: ORE.None,
          },
          {
            createdAt: 0,
            fruit: ORE.Stone,
          },
          {
            createdAt: 0,
            fruit: ORE.Stone,
          },
          {
            createdAt: 0,
            fruit: ORE.Stone,
          },
          {
            createdAt: 0,
            fruit: ORE.None,
          },
        ],
        balance: 0,
        id: this.account,
      };
    }

    const rawBalance = await this.alchemyToken.methods
      .balanceOf(this.account)
      .call({ from: this.account });
    const farm = await this.alchemyFarm.methods
      .getLand(this.account)
      .call({ from: this.account });

    const balance = this.web3.utils.fromWei(rawBalance.toString());
    return {
      balance: Number(balance),
      farm,
      id: this.account,
    };
  }

  public async craft({
    recipe,
    amount,
  }: {
    recipe: Recipe;
    amount: number;
  }) {
    const blockChain = this;

    if (this.isTrial) {
      throw new Error("TRIAL_MODE");
    }

    this.oldInventory = this.inventory;
    console.log({ recipe, amount });

    // ERC20 tokens are fractionalized so we need to multiply by 10^18 to get 1 whole one
    const mintAmount =
      recipe.type === "NFT"
        ? amount
        : this.web3.utils.toWei(amount.toString(), "ether");

    console.log({ mintAmount });

    // if (recipe.name == "Helmet") {
    var value;
    recipe.ingredients.forEach((ingredient) => {
      value = this.web3.utils.toWei(ingredient.amount.toString(), "ether");
    });
    await new Promise(async (resolve, reject) => {
      this.farm.methods
        .mintNFT(recipe.address)
        .send({ from: this.account, value })
        .on("error", function (error) {
          console.log({ error });
          // User rejected
          if (error.code === 4001) {
            return resolve(null);
          }

          localStorage.setItem("crafterror", "error occured");

          reject(error);
        })
        .on("transactionHash", function (transactionHash) {
          console.log({ transactionHash });
        })
        .on("receipt", function (receipt) {
          console.log({ receipt });
          blockChain.events = [];
          resolve(receipt);
        });
    });

    if (localStorage.getItem("crafterror") == "")
      this.inventory[recipe.name] += amount;
    // } else {
    // var value;
    // recipe.ingredients.forEach((ingredient) => {
    //   if (ingredient.name === "$BUSD") {
    //     value = BigNumber(ingredient.amount * 10 ** 18);
    //   }
    // });
    // console.log({value});
    // await new Promise(async (resolve, reject) => {
    //   var approveTX = await this.busdToken.methods
    //     .approve(this.farmAddress, value)
    //     .send({ from:this.account })
    //     .on("error", function (error) {
    //       console.log({ error });
    //       // User rejected
    //       if (error.code === 4001) {
    //         return resolve(null);
    //       }

    //       reject(error);
    //     })
    //     .on("transactionHash", function (transactionHash) {
    //       console.log({ transactionHash });
    //     })
    //     .on("receipt", function (receipt) {
    //       console.log({ receipt });
    //     });

    //   var mintTX = await this.farm.methods
    //     .mintNFT(recipe.address)
    //     .send({ from: this.account })
    //     .on("error", function (error) {
    //       console.log({ error });
    //       // User rejected
    //       if (error.code === 4001) {
    //         return resolve(null);
    //       }

    //       reject(error);
    //     })
    //     .on("transactionHash", function (transactionHash) {
    //       console.log({ transactionHash });
    //     })
    //     .on("receipt", function (receipt) {
    //       console.log({ receipt });
    //       blockChain.events = [];
    //       resolve(receipt);
    //     });

    //     approveTX.wait();
    //     mintTX.wait();
    // });
    // }
  }

  private oldInventory: Inventory | null = null;
  /**
   * ALWAYS ENSURE THAT A RESOURCE CONTRACT DOES NOT HAVE A PUBLIC MINT!
   * A resource can only be gained through a "stake"
   */
  public async stake({
    resource,
    amount,
  }: {
    resource: string;
    amount: number;
  }) {
    const blockChain = this;

    if (this.isTrial) {
      throw new Error("TRIAL_MODE");
    }

    // Save old inventory for comparison
    this.oldInventory = this.inventory;

    console.log({ resource, amount });
    const gwei = this.web3.utils.toWei(amount.toString(), "ether");

    await new Promise(async (resolve, reject) => {
      this.farm.methods
        .stake(resource, gwei)
        .send({ from: this.account })
        .on("error", function (error) {
          console.log({ error });
          // User rejected
          if (error.code === 4001) {
            return resolve(null);
          }

          reject(error);
        })
        .on("transactionHash", function (transactionHash) {
          console.log({ transactionHash });
        })
        .on("receipt", function (receipt) {
          console.log({ receipt });
          blockChain.events = [];
          resolve(receipt);
        });
    });

    // TODO fix - Avalanche (AVAX) data is stale so use this - We are waiting an extra 20 seconds
    await new Promise((res) => setTimeout(res, 20 * 1000));

    await this.loadFarm();
  }

  public async getMarketConversion(): Promise<number> {
    return await this.farm.methods
      .getMarketPrice(1)
      .call({ from: this.account });
  }

  public getWeb3() {
    return this.web3;
  }

  public addEvent(event: Transaction) {
    this.events = [...this.events, event];
  }

  public isUnsaved() {
    return this.events.length > 0;
  }

  public get isTrial() {
    return this.isTrialAccount;
  }

  public startTrialMode() {
    this.isTrialAccount = true;
  }

  public endTrialMode() {
    this.isTrialAccount = false;
  }

  public lastSaved() {
    if (this.events.length === 0) {
      return null;
    }

    return this.events[0].createdAt;
  }

  private cachedTotalSupply: number = 0;

  public async cacheTotalSupply() {
    if (!this.web3 || !this.alchemyToken) {
      this.cachedTotalSupply = 0;
    }

    const totalSupply = await this.alchemyToken.methods
      .totalSupply()
      .call({ from: this.account });

    const supply = this.web3.utils.fromWei(totalSupply);

    this.cachedTotalSupply = Number(supply);
  }

  public totalSupply() {
    return this.cachedTotalSupply;
  }

  public async getCharityBalances() {
    const coolEarth = this.web3.eth.getBalance(Charity.CoolEarth);
    const waterProject = this.web3.eth.getBalance(Charity.TheWaterProject);
    const heifer = this.web3.eth.getBalance(Charity.Heifer);
    const [coolEarthBalance, waterBalance, heiferBalance] =
      await Promise.all([coolEarth, waterProject, heifer]);

    return {
      coolEarthBalance: this.web3.utils.fromWei(coolEarthBalance, "ether"),
      waterBalance: this.web3.utils.fromWei(waterBalance, "ether"),
      heiferBalance: this.web3.utils.fromWei(heiferBalance, "ether"),
    };
  }

  // Used when a player did not save in time
  public offsetTime() {
    const latestTime = this.events[this.events.length - 1];
    const now = Math.floor(Date.now() / 1000);
    const difference = now - latestTime.createdAt;

    // For each event, add the time
    this.events = this.events.map((event) => ({
      ...event,
      createdAt: event.createdAt + difference,
    }));
  }

  public resetFarm() {
    this.events = [];
  }

  public async getReward() {
    try {
      const reward = await this.farm.methods
        .myReward()
        .call({ from: this.account });

      if (!reward) {
        return 0;
      }

      const converted = this.web3.utils.fromWei(reward.toString());

      return Number(converted);
    } catch (e) {
      // No reward ready
      return null;
    }
  }

  public async getAvaxReward() {
    try {
      const reward = await this.farm.methods
        .myAVAXReward()
        .call({ from: this.account });

      if (!reward) {
        return 0;
      }

      const converted = this.web3.utils.fromWei(reward.toString());

      return Number(converted);
    } catch (e) {
      // No reward ready
      return null;
    }
  }

  public async receiveReward() {
    const reward = await this.getReward();

    await new Promise(async (resolve, reject) => {
      const gasPrice = await this.estimate(2);

      this.farm.methods
        .receiveReward()
        .send({ from: this.account, gasPrice })
        .on("error", function (error) {
          console.log({ error });
          // User rejected
          if (error.code === 4001) {
            return resolve(null);
          }

          reject(error);
        })
        .on("transactionHash", function (transactionHash) {
          console.log({ transactionHash });
        })
        .on("receipt", function (receipt) {
          console.log({ receipt });
          resolve(receipt);
        });
    });

    this.details = {
      ...this.details,
      balance: this.details.balance + reward,
    };
  }

  public async receiveAvaxReward() {
    const reward = await this.getAvaxReward();

    await new Promise(async (resolve, reject) => {
      const gasPrice = await this.estimate(2);

      this.farm.methods
        .receiveAVAXReward()
        .send({ from: this.account, gasPrice })
        .on("error", function (error) {
          console.log({ error });
          // User rejected
          if (error.code === 4001) {
            return resolve(null);
          }

          reject(error);
        })
        .on("transactionHash", function (transactionHash) {
          console.log({ transactionHash });
        })
        .on("receipt", function (receipt) {
          console.log({ receipt });
          resolve(receipt);
        });
    });
  }

  private async loadInventory(): Promise<Inventory> {
    // Call balanceOf on each item
    const itemBalancesPromise = Object.values(this.contracts).map(
      (contract) =>
        contract.methods
          .balanceOf(this.account)
          .call({ from: this.account })
    );

    const itemBalances = await Promise.all(itemBalancesPromise);

    const values: Record<ItemName, number> = Object.keys(
      this.contracts
    ).reduce((itemValues, itemName, index) => {
      const isNFT =
        items.find((item) => item.name === itemName).type === "NFT";
      const balance = itemBalances[index];
      // return {
      //   ...itemValues,
      //   [itemName]: isNFT
      //     ? Number(balance)
      //     : Math.ceil(Number(this.web3.utils.fromWei(balance))),
      // };
      return {
        ...itemValues,
        [itemName]: isNFT
          ? Math.ceil(Number(this.web3.utils.fromWei(balance)))
          : Math.ceil(Number(this.web3.utils.fromWei(balance))),
      };
    }, {} as Record<ItemName, number>);

    return values;
  }

  private async loadTotalItemSupplies(): Promise<Inventory> {
    // Call totalSupply on each item
    const itemSupplyPromise = Object.values(this.contracts).map(
      (contract) =>
        contract.methods.totalSupply().call({ from: this.account })
    );

    const itemTotalSupplies = await Promise.all(itemSupplyPromise);

    const values: Record<ItemName, number> = Object.keys(
      this.contracts
    ).reduce(
      (itemValues, itemName, index) => ({
        ...itemValues,
        [itemName]: itemTotalSupplies[index],
      }),
      {} as Record<ItemName, number>
    );

    return values;
  }

  public getInventory() {
    return this.inventory;
  }

  public getTotalItemSupplies() {
    return this.totalItemSupplies;
  }

  public getInventoryChange(): Inventory {
    if (!this.oldInventory) {
      return DEFAULT_INVENTORY;
    }

    // Calculate the difference since we last synced with the blockchain
    const changes: Record<ItemName, number> = items.reduce(
      (change, item) => ({
        ...change,
        [item.name]:
          this.inventory[item.name] - this.oldInventory[item.name],
      }),
      {} as Record<ItemName, number>
    );

    return {
      ...changes,
    };
  }
}
