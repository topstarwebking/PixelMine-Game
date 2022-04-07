import React from "react";
import { useService } from "@xstate/react";
import Decimal from "decimal.js-light";

import { Land } from "./Land";
import { FruitItem, FRUITS, getMarketFruits } from "../../types/fruits";
import {
  ORE,
  Square,
  Action,
  Transaction,
  ActionableItem,
  isFruit,
  ACTIONABLE_ITEMS,
} from "../../types/contract";
import {
  cacheAccountFarm,
  getSelectedItem,
} from "../../utils/localStorage";

import {
  service,
  Context,
  BlockchainEvent,
  BlockchainState,
} from "../../machine";

import { Timer } from "../ui/Timer";

import { getMarketRate } from "../../utils/supply";
import { DEFAULT_INVENTORY, Inventory } from "../../types/crafting";
import { AudioPlayer } from "../ui/AudioPlayer";
import ButtonClickAudio from "../../songs/ClickButton.wav";
import "../ui/Panel.css";

import leftEdge from "../../images/ui/panel1/dt_box_9slice_lc.png";
import rightEdge from "../../images/ui/panel1/dt_box_9slice_rc.png";
import bottomEdge from "../../images/ui/panel1/dt_box_9slice_bc.png";
import topEdge from "../../images/ui/panel1/dt_box_9slice_tc.png";
import topLeft from "../../images/ui/panel1/dt_box_9slice_tl.png";
import bottomLeft from "../../images/ui/panel1/dt_box_9slice_bl.png";
import topRight from "../../images/ui/panel1/dt_box_9slice_tr.png";
import bottomRight from "../../images/ui/panel1/dt_box_9slice_br.png";

export const Farm: React.FC = () => {
  const [balance, setBalance] = React.useState<Decimal>(new Decimal(0));
  const [land, setLand] = React.useState<Square[]>(
    Array(5).fill({
      fruit: ORE.None,
      createdAt: 0,
    })
  );
  const [inventory, setInventory] =
    React.useState<Inventory>(DEFAULT_INVENTORY);

  const [totalItemSupplies, setTotalItemSupplies] =
    React.useState<Inventory>(DEFAULT_INVENTORY);

  const farmIsFresh = React.useRef(false);
  const accountId = React.useRef<string>();
  const [selectedItem, setSelectedItem] = React.useState<ActionableItem>(
    ACTIONABLE_ITEMS[0]
  );
  const [fruits, setFruits] = React.useState<FruitItem[]>(FRUITS);
  const [machineState, send] = useService<
    Context,
    BlockchainEvent,
    BlockchainState
  >(service);
  const clickButtonAudio = new Audio(ButtonClickAudio);

  const isDirty = machineState.context.blockChain.isUnsaved();

  // If they have unsaved changes, alert them before leaving
  React.useEffect(() => {
    window.onbeforeunload = function (e) {
      if (!isDirty) {
        return undefined;
      }
      e = e || window.event;

      // For IE and Firefox prior to version 4
      if (e) {
        e.returnValue = "Sure?";
      }

      // For Safari
      return "Sure?";
    };
  }, [isDirty, machineState]);

  React.useEffect(() => {
    const load = async () => {
      const isFarming =
        machineState.matches("farming") ||
        machineState.matches("onboarding");

      const doRefresh = !farmIsFresh.current;

      // HACK: Upgrade modal does not upgrade balance and farm so mark farm as stale
      if (
        machineState.matches("upgrading") ||
        machineState.matches("loading") ||
        machineState.matches("rewarding") ||
        machineState.matches("crafting")
      ) {
        farmIsFresh.current = false;
      }

      // Load fresh data from blockchain only if there are no unsaved changes
      if (
        isFarming &&
        doRefresh &&
        !machineState.context.blockChain.isUnsaved()
      ) {
        const {
          farm,
          balance: currentBalance,
          id,
        } = machineState.context.blockChain.myFarm;
        setLand(farm);
        setBalance(new Decimal(currentBalance));
        farmIsFresh.current = true;
        accountId.current = id;

        const cachedItem = getSelectedItem(id);
        setSelectedItem(cachedItem);

        const supply = await machineState.context.blockChain.totalSupply();
        const marketRate = getMarketRate(supply);
        const marketFruits = getMarketFruits(marketRate);
        setFruits(marketFruits);
      }

      if (machineState.matches("farming")) {
        const inventory =
          await machineState.context.blockChain.getInventory();
        setInventory(inventory);
        const itemSupplies =
          await machineState.context.blockChain.getTotalItemSupplies();
        setTotalItemSupplies(itemSupplies);
      }
    };

    load();
  }, [machineState]);

  const onChangeItem = (item: ActionableItem) => {
    setSelectedItem(item);

    cacheAccountFarm(accountId.current, { selectedItem: item.name });
    // TODO - ?localStorage.setItem("fruit", fruit);
  };
  const onHarvest = React.useCallback(
    async (landIndex: number) => {
      if (!isFruit(selectedItem)) {
        return;
      }

      const now = Math.floor(Date.now() / 1000);

      const harvestedFruit = land[landIndex];
      const transaction: Transaction = {
        action: Action.Harvest,
        fruit: ORE.None,
        landIndex,
        createdAt: now,
      };
      machineState.context.blockChain.addEvent(transaction);

      setLand((oldLand) =>
        oldLand.map((field, index) =>
          index === landIndex ? { fruit: ORE.None, createdAt: 0 } : field
        )
      );
      const price = fruits.find(
        (item) => item.fruit === harvestedFruit.fruit
      ).sellPrice;

      setBalance(balance.plus(price));

      send("HARVEST");
    },
    [balance, fruits, land, machineState.context.blockChain, send]
  );

  const onPlant = React.useCallback(
    async (landIndex: number) => {
      if (!isFruit(selectedItem)) {
        return;
      }

      const price = fruits.find(
        (item) => item.fruit === selectedItem.fruit
      ).buyPrice;

      if (balance.lt(price)) {
        return;
      }

      const now = Math.floor(Date.now() / 1000);
      const transaction: Transaction = {
        action: Action.Plant,
        fruit: selectedItem.fruit,
        landIndex,
        createdAt: now,
      };
      machineState.context.blockChain.addEvent(transaction);

      setLand((oldLand) => {
        const newLand = oldLand.map((field, index) =>
          index === landIndex ? transaction : field
        );
        return newLand;
      });
      setBalance(balance.minus(price));

      send("PLANT");
    },
    [balance, selectedItem, fruits, machineState.context.blockChain, send]
  );

  const onBuyMore = () => {
    clickButtonAudio.play();
    window.open("", "_blank");
  };

  const save = async () => {
    clickButtonAudio.play();
    send("SAVE", { action: "SYNC" });
  };

  const safeBalance = balance.toNumber();

  return (
    <>
      {/* <Tour /> */}
      <div className="area">
        <div style={{ gridColumn: "1", gridRow: "1" }}>
          <Land
            fruits={fruits}
            selectedItem={selectedItem}
            onSelectItem={onChangeItem}
            land={land}
            balance={safeBalance}
            onHarvest={onHarvest}
            onPlant={onPlant}
            account={accountId.current}
            inventory={inventory}
            totalItemSupplies={totalItemSupplies}
          />
        </div>
        <span id="count-down">
          <Timer
            isdirty={isDirty}
            startAtSeconds={machineState.context.blockChain.lastSaved()}
          />
        </span>
        <span
          id="save-button"
          style={!isDirty ? { opacity: "0.6" } : {}}
          onClick={
            !isDirty ||
            machineState.matches("timerComplete") ||
            machineState.matches("saving")
              ? undefined
              : save
          }
        ></span>
        <div id="buy-now" onClick={onBuyMore}></div>
        <div id="balance">
          <div id="inner">
            {machineState.context.blockChain.isConnected
              ? safeBalance.toFixed(2)
              : "00.00"}
          </div>
        </div>
        <div id="audio-player">
          <AudioPlayer />
        </div>
        <div id="advertisement">
          <img id="panel-left-edge" src={leftEdge} />
          <img id="panel-right-edge" src={rightEdge} />
          <img id="panel-bottom-edge" src={bottomEdge} />
          <img id="panel-top-edge" src={topEdge} />
          <img id="panel-top-left" src={topLeft} />
          <img id="panel-bottom-left" src={bottomLeft} />
          <img id="panel-bottom-right" src={bottomRight} />
          <img id="panel-top-right" src={topRight} />
        </div>
        <div id="advertisementUnder">
          <img id="panel-left-edge" src={leftEdge} />
          <img id="panel-right-edge" src={rightEdge} />
          <img id="panel-bottom-edge" src={bottomEdge} />
          <img id="panel-top-edge" src={topEdge} />
          <img id="panel-top-left" src={topLeft} />
          <img id="panel-bottom-left" src={bottomLeft} />
          <img id="panel-bottom-right" src={bottomRight} />
          <img id="panel-top-right" src={topRight} />
        </div>
      </div>
    </>
  );
};

export default Farm;
