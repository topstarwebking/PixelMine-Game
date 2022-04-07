import React from "react";
import { useService } from "@xstate/react";

import Modal from "react-bootstrap/Modal";

import openTreasure from "../../images/decorations/open_treasure.png";

import {
  service,
  Context,
  BlockchainEvent,
  BlockchainState,
} from "../../machine";

import cancel from "../../images/ui/cancel.png";
import coin from "../../images/ui/coin.png";

import { Panel } from "./Panel";
import { Message } from "./Message";
import { Button } from "./Button";

import "./UpgradeModal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onReceive: () => void;
  reward: number;
}

export const RewardModal: React.FC<Props> = ({
  isOpen,
  onClose,
  reward,
  onReceive,
}) => {
  const [machineState, send] = useService<
    Context,
    BlockchainEvent,
    BlockchainState
  >(service);

  const isUnsaved = machineState.context.blockChain.isUnsaved();

  if (!reward) {
    return null;
  }

  return (
    <Modal centered show={isOpen} onHide={onClose}>
      <Panel>
        <div id="reward-container">
          <span>
            COLLECT YOUR <span id="reward-text">REWARD</span>
          </span>

          {isUnsaved ? (
            <>
              <div className="upgrade-required">
                <Message>
                  Save Your Mining Area
                  <img src={cancel} className="insufficient-funds-cross" />
                </Message>
              </div>
              <span id="donate-description">
                You must first save your farm to the blockchain before
                attempting to receive your reward.{" "}
              </span>
            </>
          ) : (
            <div>
              <div id="treasure-holder">
                <img src={openTreasure} id="open-treasure" />
                {/* <img src={coin} id="reward-coin" /> */}
              </div>
              <div id="reward-button" onClick={onReceive}>
                {/* <Button>Collect</Button> */}
              </div>
            </div>
          )}
        </div>
      </Panel>
    </Modal>
  );
};

export const UpgradeOverlay = (props) => (
  <div id="tester" {...props}>
    <Message>Upgrade required</Message>
  </div>
);
