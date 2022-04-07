import React from "react";
import { useService } from "@xstate/react";

import Modal from "react-bootstrap/Modal";

import {
  service,
  Context,
  BlockchainEvent,
  BlockchainState,
} from "../../machine";

import iron from "../../images/ore/iron/fruit.png";
import bauxite from "../../images/ore/bauxite/fruit.png";
import phospate from "../../images/ore/phospate/fruit.png";
import silver from "../../images/ore/silver/fruit.png";
import sulfur from "../../images/ore/sulfur/fruit.png";
import gold from "../../images/ore/gold/fruit.png";
import diamond from "../../images/ore/diamond/fruit.png";

import cancel from "../../images/ui/cancel.png";

import { getUpgradePrice } from "../../utils/land";
import { getMarketRate } from "../../utils/supply";

import { Panel } from "./Panel";
import { Message } from "./Message";
import { Button } from "./Button";

import "./UpgradeModal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  farmSize: number;
  balance: number;
}

export const UpgradeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  farmSize,
  balance,
}) => {
  const [machineState, send] = useService<
    Context,
    BlockchainEvent,
    BlockchainState
  >(service);
  const [totalSupply, setTotalSupply] = React.useState<number>(1);

  React.useEffect(() => {
    const load = async () => {
      const supply =
        await service.machine.context.blockChain.totalSupply();
      console.log({ supply });
      setTotalSupply(supply);
    };

    load();
  }, [isOpen]);

  const onUpgrade = () => {
    send("SAVE", { action: "UPGRADE" });
    onClose();
  };

  const isUnsaved = machineState.context.blockChain.isUnsaved();

  const levelOnePrice = getUpgradePrice({ farmSize, totalSupply });
  const levelTwoPrice = getUpgradePrice({ farmSize, totalSupply });
  const levelThreePrice = getUpgradePrice({ farmSize, totalSupply });
  const levelFourPrice = getUpgradePrice({ farmSize, totalSupply });

  return (
    <Modal centered show={isOpen} onHide={onClose}>
      <Panel>
        <div id="charity-container">
          <span>UPGRADE AREA</span>

          {isUnsaved ? (
            <>
              <div className="upgrade-required">
                <Message>
                  Save Your Mining Area
                  <img
                    src={cancel}
                    className="insufficient-funds-cross"
                    alt=""
                  />
                </Message>
              </div>
              <span id="donate-description">
                You must first save your farm to the blockchain before
                attempting to upgrade.{" "}
              </span>
            </>
          ) : (
            <span id="donate-description">
              Upgrade your mining area to unlock new ores and minable
              fields.
            </span>
          )}

          <div id="charities">
            {farmSize === 5 && (
              <div>
                <span className="charity-description">
                  Upgrade to 8 fields
                </span>
                <div className="upgrade-icons">
                  <span className="charity-description">Unlock:</span>
                  <img src={iron} className="upgrade-fruit" alt="" />
                  <img src={bauxite} className="upgrade-fruit" alt="" />
                </div>
                <div className="charity-buttons">
                  <span>{`${levelOnePrice} $PIMI`}</span>
                  <div
                    className="upgrade-area-button"
                    onClick={
                      isUnsaved || balance < levelOnePrice
                        ? undefined
                        : onUpgrade
                    }
                  ></div>
                  {/* <Button
                    disabled={isUnsaved || balance < levelOnePrice}
                    onClick={onUpgrade}
                  >
                    Upgrade
                  </Button> */}
                </div>
                {balance < levelOnePrice && (
                  <span className="insufficent-upgrade-funds">
                    Not Enough PIMI
                  </span>
                )}
              </div>
            )}
            {farmSize === 8 && (
              <div>
                <span className="charity-description">
                  Upgrade to 11 fields
                </span>
                <div className="upgrade-icons">
                  <span className="charity-description">Unlock:</span>
                  <img src={phospate} className="upgrade-fruit" alt="" />
                </div>
                <div className="charity-buttons">
                  <span>{`${levelTwoPrice} $PIMI`}</span>
                  <div
                    className="upgrade-area-button"
                    onClick={
                      isUnsaved || farmSize < 8 || balance < levelTwoPrice
                        ? undefined
                        : onUpgrade
                    }
                  ></div>
                  {/* <Button
                    disabled={
                      isUnsaved || farmSize < 8 || balance < levelTwoPrice
                    }
                    onClick={onUpgrade}
                  >
                    Upgrade
                  </Button> */}
                </div>
                {balance < levelTwoPrice && (
                  <span className="insufficent-upgrade-funds">
                    Not Enough PIMI
                  </span>
                )}
              </div>
            )}

            {farmSize === 11 && (
              <div>
                <span className="charity-description">
                  Upgrade to 14 fields
                </span>
                <div className="upgrade-icons">
                  <span className="charity-description">Unlock:</span>
                  <img src={sulfur} className="upgrade-fruit" alt="" />
                  <img src={silver} className="upgrade-fruit" alt="" />
                </div>
                <div className="charity-buttons">
                  <span>{`${levelThreePrice} $PIMI`}</span>
                  <div
                    className="upgrade-area-button"
                    onClick={
                      isUnsaved ||
                      farmSize < 11 ||
                      balance < levelThreePrice
                        ? undefined
                        : onUpgrade
                    }
                  ></div>
                  {/* <Button
                    disabled={
                      isUnsaved ||
                      farmSize < 11 ||
                      balance < levelThreePrice
                    }
                    onClick={onUpgrade}
                  >
                    Upgrade
                  </Button> */}
                </div>
                {balance < levelThreePrice && (
                  <span className="insufficent-upgrade-funds">
                    Not Enough PIMI
                  </span>
                )}
              </div>
            )}

            {farmSize === 14 && (
              <div>
                <span className="charity-description">
                  Upgrade to 17 fields
                </span>
                <div className="upgrade-icons">
                  <span className="charity-description">Unlock:</span>
                  <img src={gold} className="upgrade-fruit" alt="" />
                  <img src={diamond} className="upgrade-fruit" alt="" />
                </div>
                <div className="charity-buttons">
                  <span>{`${levelFourPrice} $PIMI`}</span>
                  <div
                    className="upgrade-area-button"
                    onClick={
                      isUnsaved ||
                      farmSize < 14 ||
                      balance < levelFourPrice
                        ? undefined
                        : onUpgrade
                    }
                  ></div>
                  {/* <Button
                    disabled={
                      isUnsaved ||
                      farmSize < 14 ||
                      balance < levelFourPrice
                    }
                    onClick={onUpgrade}
                  >
                    Upgrade
                  </Button> */}
                </div>
                {balance < levelFourPrice && (
                  <span className="insufficent-upgrade-funds">
                    Not Enough PIMI
                  </span>
                )}
              </div>
            )}
          </div>
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
