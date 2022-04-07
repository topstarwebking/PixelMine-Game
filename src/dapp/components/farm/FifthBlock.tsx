import React from "react";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import soil from "../../images/land/soil/locked.png";
import { ActionableItem, ORE, Square } from "../../types/contract";
import { FruitItem } from "../../types/fruits";
 
import { UpgradeOverlay } from "../ui/UpgradeModal";

import { Field } from "./Field";

interface Props {
  land: Square[];
  balance: number;
  onHarvest: (landIndex: number) => void;
  onPlant: (landIndex: number) => void;
  selectedItem: ActionableItem;
  fruits: FruitItem[];
}

export const FifthBlock: React.FC<Props> = ({
  fruits,
  land,
  balance,
  onHarvest,
  onPlant,
  selectedItem,
}) => {
  const isUnlocked = land.length > 14;

  return (
    <>
      <div className="dirt" style={{ gridColumn: "4", gridRow: "12" }}>
        {isUnlocked ? (
          <Field
            fruits={fruits}
            balance={balance}
            selectedItem={selectedItem}
            square={land[14]}
            onClick={
              land[14].fruit === ORE.None
                ? () => onPlant(14)
                : () => onHarvest(14)
            }
          />
        ) : (
          <div className="field">
            <img src={soil} alt="" />
          </div>
        )}
      </div>
      <div className="dirt" style={{ gridColumn: "3", gridRow: "13" }}>
        {isUnlocked ? (
          <Field
            fruits={fruits}
            balance={balance}
            selectedItem={selectedItem}
            square={land[15]}
            onClick={
              land[15].fruit === ORE.None
                ? () => onPlant(15)
                : () => onHarvest(15)
            }
          />
        ) : (
          <div className="field">
            <img src={soil} alt="" />
          </div>
        )}
      </div>
      <div className="dirt" style={{ gridColumn: "5", gridRow: "13" }}>
        {isUnlocked ? (
          <Field
            fruits={fruits}
            balance={balance}
            selectedItem={selectedItem}
            square={land[16]}
            onClick={
              land[16].fruit === ORE.None
                ? () => onPlant(16)
                : () => onHarvest(16)
            }
          />
        ) : (
          <div className="field">
            <img src={soil} alt="" />
          </div>
        )}
      </div>

      {!isUnlocked && (
        <OverlayTrigger
          overlay={UpgradeOverlay}
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
        >
          <div
            className="upgrade-overlay"
            style={{ gridColumn: "3/5", gridRow: "12/13" }}
          />
        </OverlayTrigger>
      )}
    </>
  );
};
