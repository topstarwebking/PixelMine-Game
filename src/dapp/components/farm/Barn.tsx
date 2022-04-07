import React from "react";

import { service } from "../../machine";

import { UpgradeModal } from "../ui/UpgradeModal";
import ButtonClickAudio from "../../songs/ClickButton.wav";
import "../ui/Pickaxe.css";
interface Props {
  farmSize: number;
  balance: number;
}

export const Barn: React.FC<Props> = ({ farmSize, balance }) => {
  const [showModal, setShowModal] = React.useState(false);
  const clickButtonAudio = new Audio(ButtonClickAudio);

  const onUpgrade = () => {
    clickButtonAudio.play();
    if (farmSize < 17) setShowModal(true);
  };

  const onUpgradeConfirm = () => {
    service.send("UPGRADE");
  };

  return (
    <>
      <div
        style={{
          gridColumn: "6",
          gridRow: "2",
          left: "-23px",
          top: "-15px",
        }}
      >
        <div
          className={`dig loop`}
          style={farmSize < 17 ? { opacity: "1" } : { opacity: "0.7" }}
          onClick={onUpgrade}
        ></div>
        <UpgradeModal
          onClose={() => setShowModal(false)}
          isOpen={showModal}
          farmSize={farmSize}
          balance={balance}
        />
      </div>
    </>
  );
};
