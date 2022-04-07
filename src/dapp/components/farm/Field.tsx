import React, { useRef } from "react";
import { useService } from "@xstate/react";

import stone from "../../images/ore/stone/fruit.png";
import stoneSeedling from "../../images/ore/stone/seedling.png";
import coal from "../../images/ore/coal/fruit.png";
import coalSeedling from "../../images/ore/coal/seedling.png";
import iron from "../../images/ore/iron/fruit.png";
import ironSeedling from "../../images/ore/iron/seedling.png";
import bauxite from "../../images/ore/bauxite/fruit.png";
import bauxiteSeedling from "../../images/ore/bauxite/seedling.png";
import phospate from "../../images/ore/phospate/fruit.png";
import phospateSeedling from "../../images/ore/phospate/seedling.png";
import silver from "../../images/ore/silver/fruit.png";
import silverSeedling from "../../images/ore/silver/seedling.png";
import sulfur from "../../images/ore/sulfur/fruit.png";
import sulfurSeedling from "../../images/ore/sulfur/seedling.png";
import gold from "../../images/ore/gold/fruit.png";
import goldSeedling from "../../images/ore/gold/seedling.png";
import diamond from "../../images/ore/diamond/fruit.png";
import diamondSeedling from "../../images/ore/diamond/seedling.png";

import coin from "../../images/ui/icon.png";

import planted from "../../images/land/soil/planted.png";
import terrain from "../../images/land/soil/soil.png";

import progressStart from "../../images/ui/progress/start.png";
import progressQuarter from "../../images/ui/progress/quarter.png";
import progressHalf from "../../images/ui/progress/half.png";
import progressAlmost from "../../images/ui/progress/almost.png";

import selectBoxTL from "../../images/ui/select-box/selectbox_tl.png";
import selectBoxTR from "../../images/ui/select-box/selectbox_tr.png";
import selectBoxBR from "../../images/ui/select-box/selectbox_br.png";
import selectBoxBL from "../../images/ui/select-box/selectbox_bl.png";

import { FruitItem } from "../../types/fruits";
import {
  ActionableItem,
  ORE,
  isFruit,
  Square,
} from "../../types/contract";
import { secondsToString } from "../../utils/time";

import "./Field.css";

import PlantAudio from "../../songs/PlaceMine.wav";
import CollectAudio from "../../songs/Collect.wav";
import { DEFAULT_INVENTORY, Inventory } from "../../types/crafting";

import {
  service,
  Context,
  BlockchainEvent,
  BlockchainState,
} from "../../machine";
interface Props {
  square: Square;
  selectedItem: ActionableItem;
  fruits: FruitItem[];
  balance: number;
  onClick: () => void;
}

function getTimeLeft(createdAt: number, totalTime: number) {
  const secondsElapsed = Date.now() / 1000 - createdAt;
  if (secondsElapsed > totalTime) {
    return 0;
  }

  return totalTime - secondsElapsed;
}

export const Field: React.FC<Props> = ({
  square,
  onClick,
  selectedItem,
  balance,
  fruits,
}) => {
  const [, setTimer] = React.useState<number>(0);
  const [harvestPrice, setHarvestPrice] = React.useState<string>(null);
  const [showPrice, setShowPrice] = React.useState(false);
  const [showInsufficientFunds, setShowInsufficientFunds] =
    React.useState(false);

  const [inventory, setInventory] =
    React.useState<Inventory>(DEFAULT_INVENTORY);

  const fruit = fruits.find((item) => item.fruit === square.fruit);

  const plantAudio = new Audio(PlantAudio);
  const harvestAudio = new Audio(CollectAudio);

  const [machineState, send] = useService<
    Context,
    BlockchainEvent,
    BlockchainState
  >(service);

  const calculateTotalTime = () => {
    if (fruit?.name == "Phospate") {
      if (inventory.Axe) return (fruit?.harvestMinutes * 60) / 3;
    }
    if (fruit?.name == "Sulfur") {
      if (inventory.Hammer) return (fruit?.harvestMinutes * 60) / 3;
    }
    if (fruit?.name == "Diamond") {
      if (inventory.Drill) return (fruit?.harvestMinutes * 60) / 3;
    }

    return fruit?.harvestMinutes * 60;
  };

  var totalTime = calculateTotalTime();

  React.useEffect(() => {
    const load = async () => {
      if (machineState.matches("farming")) {
        const inventory =
          await machineState.context.blockChain.getInventory();
        setInventory(inventory);
        totalTime = calculateTotalTime();
      }
    };

    load();
  }, [machineState]);

  const click = React.useCallback(() => {
    if (!isFruit(selectedItem)) {
      return;
    }
    // Show harvest price

    const fruit = fruits.find((item) => item.fruit === square.fruit);
    // Harvest
    if (fruit) {
      harvestAudio.play();
      setHarvestPrice(`+${fruit.sellPrice}`);
    } else {
      // Plant
      plantAudio.play();
      const buyORE = fruits.find(
        (item) => item.fruit === selectedItem.fruit
      );

      if (buyORE.buyPrice > balance) {
        setShowInsufficientFunds(true);
        window.setTimeout(() => {
          setShowInsufficientFunds(false);
        }, 500);

        return;
      }

      setHarvestPrice(`-${buyORE.buyPrice}`);
    }

    setShowPrice(true);

    // Remove harvest price after X seconds
    window.setTimeout(() => {
      setShowPrice(false);
    }, 700);

    onClick();
  }, [balance, onClick, selectedItem, square.fruit]);

  const setHarvestTime = React.useCallback(() => {
    setTimer((count) => count + 1);
  }, []);

  React.useEffect(() => {
    if (square.fruit && square.fruit !== ORE.None) {
      setHarvestTime();
      const interval = window.setInterval(setHarvestTime, 1000);
      return () => window.clearInterval(interval);
    }
    /* eslint-disable */
  }, [square]);
  /* eslint-enable */

  const Seedling = () => {
    // TODO different plant seedlings
    if (square.fruit === ORE.Stone) {
      return <img src={stoneSeedling} className="seedling" alt="" />;
    }

    if (square.fruit === ORE.Coal) {
      return <img src={coalSeedling} className="seedling" alt="" />;
    }

    if (square.fruit === ORE.Iron) {
      return <img src={ironSeedling} className="seedling" alt="" />;
    }

    if (square.fruit === ORE.Bauxite) {
      return <img src={bauxiteSeedling} className="seedling" alt="" />;
    }

    if (square.fruit === ORE.Phospate) {
      return <img src={phospateSeedling} className="seedling" alt="" />;
    }

    if (square.fruit === ORE.Sulfur) {
      return <img src={sulfurSeedling} className="seedling" alt="" />;
    }

    if (square.fruit === ORE.Silver) {
      return <img src={silverSeedling} className="seedling" alt="" />;
    }

    if (square.fruit === ORE.Gold) {
      return <img src={goldSeedling} className="seedling" alt="" />;
    }

    if (square.fruit === ORE.Diamond) {
      return <img src={diamondSeedling} className="seedling" alt="" />;
    }

    return null;
  };

  const Plant = () => {
    // TODO different plant seedlings
    if (square.fruit === ORE.Stone) {
      return <img src={stone} className="harvest-ready" alt="" />;
    }

    if (square.fruit === ORE.Coal) {
      return <img src={coal} className="harvest-ready" alt="" />;
    }

    if (square.fruit === ORE.Iron) {
      return <img src={iron} className="harvest-ready" alt="" />;
    }

    if (square.fruit === ORE.Bauxite) {
      return <img src={bauxite} className="harvest-ready" alt="" />;
    }

    if (square.fruit === ORE.Phospate) {
      return <img src={phospate} className="harvest-ready" alt="" />;
    }

    if (square.fruit === ORE.Sulfur) {
      return <img src={sulfur} className="harvest-ready" alt="" />;
    }

    if (square.fruit === ORE.Silver) {
      return <img src={silver} className="harvest-ready" alt="" />;
    }

    if (square.fruit === ORE.Gold) {
      return <img src={gold} className="harvest-ready" alt="" />;
    }

    if (square.fruit === ORE.Diamond) {
      return <img src={diamond} className="harvest-ready" alt="" />;
    }

    return null;
  };

  const Progress = () => {
    if (timeLeft > totalTime * (3 / 4)) {
      return <img src={progressStart} className="progress" alt="" />;
    }

    if (timeLeft > totalTime * (1 / 2)) {
      return <img src={progressQuarter} className="progress" alt="" />;
    }

    if (timeLeft > totalTime * (1 / 4)) {
      return <img src={progressHalf} className="progress" alt="" />;
    }

    if (timeLeft > 0) {
      return <img src={progressAlmost} className="progress" alt="" />;
    }

    return null;
  };

  const timeLeft = getTimeLeft(square.createdAt, totalTime);

  const plantingFruit =
    isFruit(selectedItem) &&
    fruits.find((item) => item.fruit === selectedItem.fruit);

  return (
    <div className="field" onClick={!timeLeft ? click : undefined}>
      <div
        className="harvest"
        style={{ opacity: !!showPrice ? "1" : "0" }}
      >
        <span className="harvest-amount">{harvestPrice}</span>
        <img className="harvest-coin" src={coin} alt="" />
      </div>
      {square.fruit === ORE.None && (
        <>
          {!showPrice && (
            <img className="plant-hint" src={plantingFruit.image} alt="" />
          )}
          <img src={terrain} className="soil" />
        </>
      )}
      {
        <span
          className="field-no-funds"
          style={{ opacity: !!showInsufficientFunds ? 1 : 0 }}
        >
          Not Enough
        </span>
      }
      {square.fruit !== ORE.None && (
        <>
          <img src={planted} className="planted-soil" alt="" />
          {timeLeft && timeLeft > 0 && Seedling()}
          {timeLeft === 0 && Plant()}
          {Progress()}
          {timeLeft && timeLeft > 0 && (
            <span className="progress-text">
              {secondsToString(timeLeft)}
            </span>
          )}
        </>
      )}
      <div className="field-edges">
        <div>
          <img src={selectBoxTL} alt="" />
          <img src={selectBoxTR} alt="" />
        </div>
        <div>
          <img src={selectBoxBL} alt="" />
          <img src={selectBoxBR} alt="" />
        </div>
      </div>
    </div>
  );
};
