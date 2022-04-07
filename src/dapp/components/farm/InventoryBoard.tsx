import React from "react";
import Big from "big.js";

import Modal from "react-bootstrap/Modal";

import stopwatch from "../../images/ui/stopwatch.png";
import cancel from "../../images/ui/cancel.png";
import alert from "../../images/ui/expression_alerted.png";
import coin from "../../images/ui/icon.png";
import arrow from "../../images/ui/arrow_right.png";

import { ActionableItem, isFruit } from "../../types/contract";

import { secondsToString } from "../../utils/time";

import "./FruitBoard.css";

import { Panel } from "../ui/Panel";
import { Message } from "../ui/Message";
import { FruitItem} from "../../types/fruits";
import { Inventory } from "../ui/Inventory";
import { Inventory as InventoryItem } from "../../types/crafting";
import ButtonClickAudio from "../../songs/ClickButton.wav";

interface Props {
  selectedItem: ActionableItem;
  onSelectItem: (item: ActionableItem) => void;
  balance: number;
  land: any[];
  fruits: FruitItem[];
  inventory: InventoryItem;
}
export const InventoryBoard: React.FC<Props> = ({
  balance,
  land,
  onSelectItem,
  selectedItem,
  fruits,
  inventory,
}) => {
  const [showModal, setShowModal] = React.useState(false);

  const selectFruit = (fruit: FruitItem) => {
    setShowModal(false);
    onSelectItem(fruit);
  };

  const clickButtonAudio = new Audio(ButtonClickAudio);

  const showModalFunc = () => {
    clickButtonAudio.play();
    setShowModal(true);
  }

  const items = [];
  let needsUpgrade = false;
  let needsMoreMoney = false;
  fruits.forEach((fruit) => {
    const buyPrice = Big(fruit.buyPrice).toNumber();
    const sellPrice = Big(fruit.sellPrice).toNumber();

    if (!needsUpgrade && fruit.landRequired > land.length) {
      needsUpgrade = true;
    }

    if (!needsMoreMoney && fruit.buyPrice > balance) {
      needsMoreMoney = true;
    }

    const isLocked = needsUpgrade || needsMoreMoney;

    items.push(
      <div key={fruit.name} className={isLocked ? "locked item" : "item"}>
        <div
          className={
            isFruit(selectedItem) && selectedItem.fruit === fruit.fruit
              ? "selected icon"
              : "icon"
          }
          onClick={!isLocked ? () => selectFruit(fruit) : undefined}
        >
          <div className="image">
            <img src={fruit.image} alt="" />
          </div>
        </div>
        <div className="fruit-details">
          <div>
            <span className="title">{fruit.name}</span>

            <div className="fruit-time">
              <img src={stopwatch} alt="" />
              <span>{secondsToString(fruit.harvestMinutes * 60)}</span>
            </div>
          </div>
          <div className="fruit-breakdown">
            <div className="price">
              <span className="price-label">Plant</span>
              <img src={coin} alt="" />
              <span>{buyPrice}</span>
            </div>
            <div className="fruit-arrows">
              <img src={arrow} alt="" />
              <img src={arrow} alt="" />
              <img src={arrow} alt="" />
            </div>
            <div className="price">
              <span className="price-label">Harvest</span>
              <img src={coin} alt="" />
              <span>{sellPrice}</span>
            </div>
          </div>
        </div>
      </div>
    );

    if (needsUpgrade) {
      items.push(
        <div className="upgrade-required">
          <Message>
            Upgrade Required
            <img src={alert} className="insufficient-funds-alert" alt="" />
          </Message>
        </div>
      );
    } else if (needsMoreMoney) {
      items.push(
        <div className="upgrade-required">
          <Message>
            Not Enough
            <img src={cancel} className="insufficient-funds-cross" alt="" />
          </Message>
        </div>
      );
    }
  });

  return (
    <>
      <div style={{gridColumn: "9", gridRow: "2", left: "10px", top: "-15px"}} id="basketInventory" onClick={showModalFunc}>
      </div>
      <Modal
        show={showModal}
        dialogClassName="inventory-board-modal"
        centered
        onHide={() => setShowModal(false)}
      >
        <div className="board">
          <Panel>
          {/* <Items
            balance={balance}
            fruits={fruits}
            selectedItem={selectedItem}
            onSelectItem={onSelectItem}
            land={land}
            onClose={() => setShowModal(false)}
            inventory={inventory}
          /> */}
          <Inventory
            selectedItem={selectedItem}
            onSelectItem={onSelectItem}
            fruits={fruits}
            land={land}
            balance={balance}
            inventory={inventory}
          />
          {/* <div className="board-content">{items}</div> */}
          </Panel>
          </div>
      </Modal>
    </>
  );
};
