import React from "react";
import Modal from "react-bootstrap/Modal";

import { Panel } from "../ui/Panel";

import { CraftingMenu } from "../ui/CraftingMenu";
import { Inventory } from "../../types/crafting";
import ButtonClickAudio from "../../songs/ClickButton.wav";

interface Props {
  inventory: Inventory;
  totalItemSupplies: Inventory;
  balance: number;
}
export const Blacksmith: React.FC<Props> = ({
  inventory,
  totalItemSupplies,
  balance,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const clickButtonAudio = new Audio(ButtonClickAudio);

  const showModalFunc = () => {
    clickButtonAudio.play();
    setShowModal(true);
  }

  return (
    <>
        <div
          id="minter"
          style={{gridColumn: "13", gridRow: "2", left: "0px", top: "-15px"}}
          onClick={showModalFunc}
          >
        </div>
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Panel>
          <CraftingMenu
            onClose={() => setShowModal(false)}
            inventory={inventory}
            totalItemSupplies={totalItemSupplies}
            balance={balance}
          />
        </Panel>
      </Modal>
      {/* <div
        id="mainlogo"
        style={{gridColumn: "7", gridRow: "1"}}
        // onClick={() => setShowModal(true)}
      ></div> */}
    </>
  );
};
