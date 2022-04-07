import React from "react";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { ActionableItem, ORE, Square } from "../../types/contract";

import { UpgradeOverlay } from "../ui/UpgradeModal";

import soil from "../../images/land/soil/locked.png";

import { Field } from "./Field";
import { FruitItem } from "../../types/fruits";

interface Props {
  land: Square[];
  balance: number;
  onHarvest: (landIndex: number) => void;
  onPlant: (landIndex: number) => void;
  selectedItem: ActionableItem;
  fruits: FruitItem[];
}

export const ThirdBlock: React.FC<Props> = ({
  fruits,
  land,
  balance,
  onHarvest,
  onPlant,
  selectedItem,
}) => {
  const isUnlocked = land.length > 8;

  return (
    <>
      <div className="dirt" style={{ gridColumn: "18", gridRow: "5" }}>
        {isUnlocked ? (
          <Field
            fruits={fruits}
            balance={balance}
            selectedItem={selectedItem}
            square={land[8]}
            onClick={
              land[8].fruit === ORE.None
                ? () => onPlant(8)
                : () => onHarvest(8)
            }
          />
        ) : (
          <div className="field">
            <img src={soil} alt="" />
          </div>
        )}
      </div>
      <div className="dirt" style={{ gridColumn: "17", gridRow: "4" }}>
        {isUnlocked ? (
          <Field
            fruits={fruits}
            balance={balance}
            selectedItem={selectedItem}
            square={land[9]}
            onClick={
              land[9].fruit === ORE.None
                ? () => onPlant(9)
                : () => onHarvest(9)
            }
          />
        ) : (
          <div className="field">
            <img src={soil} alt="" />
          </div>
        )}
      </div>

      <div className="dirt" style={{ gridColumn: "16", gridRow: "5" }}>
        {isUnlocked ? (
          <Field
            fruits={fruits}
            balance={balance}
            selectedItem={selectedItem}
            square={land[10]}
            onClick={
              land[10].fruit === ORE.None
                ? () => onPlant(10)
                : () => onHarvest(10)
            }
          />
        ) : (
          <div className="field">
            <img src={soil} alt="" />
          </div>
        )}
      </div>
      
      {/* Dirt around */}
      <div className="dirt" style={{ gridColumn: "15", gridRow: "4" }} />
      <div className="dirt" style={{ gridColumn: "15", gridRow: "5" }} />
      <div className="dirt" style={{ gridColumn: "16", gridRow: "4" }} />
      <div className="dirt" style={{ gridColumn: "17", gridRow: "5" }} />
      <div className="dirt" style={{ gridColumn: "18", gridRow: "4" }} />
      <div className="dirt" style={{ gridColumn: "19", gridRow: "4" }} />
      <div className="dirt" style={{ gridColumn: "19", gridRow: "5" }} />
      <div className="dirt" style={{ gridColumn: "19", gridRow: "6" }} />
      <div className="dirt" style={{ gridColumn: "18", gridRow: "6" }} />
      <div className="dirt" style={{ gridColumn: "17", gridRow: "6" }} />
      <div className="stone" style={{ gridColumn: "11", gridRow: "7" }} />
      <div className="stone" style={{ gridColumn: "12", gridRow: "7" }} />
      <div className="stone" style={{ gridColumn: "13", gridRow: "7" }} />
      <div className="stone" style={{ gridColumn: "14", gridRow: "7" }} />
      <div className="stone" style={{ gridColumn: "15", gridRow: "7" }} />
      <div className="stone" style={{ gridColumn: "16", gridRow: "7" }} />
      <div className="dirt" style={{ gridColumn: "19", gridRow: "7" }} />
      <div className="dirt" style={{ gridColumn: "18", gridRow: "7" }} />
      <div className="dirt" style={{ gridColumn: "17", gridRow: "7" }} />
      <div className="dirt" style={{ gridColumn: "2", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "3", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "4", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "5", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "6", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "7", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "8", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "9", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "10", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "11", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "12", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "13", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "14", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "15", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "16", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "17", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "18", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "19", gridRow: "8" }} />
      <div className="dirt" style={{ gridColumn: "2", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "3", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "4", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "5", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "6", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "7", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "8", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "9", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "10", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "11", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "12", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "13", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "14", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "15", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "16", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "17", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "18", gridRow: "9" }} />
      <div className="dirt" style={{ gridColumn: "19", gridRow: "9" }} />

      {/* Stone-fence */}
      <div
        className="bottom-corner"
        style={{ gridColumn: "1", gridRow: "10" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "2", gridRow: "10" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "3", gridRow: "10" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "4", gridRow: "10" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "5", gridRow: "10" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "6", gridRow: "10" }}
      />

      <div
        className="left-edge"
        style={{ gridColumn: "6", gridRow: "10" }}
      />

      <div
        className="top-corner2"
        style={{ gridColumn: "1", gridRow: "10" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "2", gridRow: "10" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "3", gridRow: "10" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "4", gridRow: "10" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "5", gridRow: "10" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "6", gridRow: "10" }}
      />

      {!isUnlocked && (
        <OverlayTrigger
          overlay={UpgradeOverlay}
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
        >
          <div
            className="upgrade-overlay"
            style={{ gridColumn: "16/18", gridRow: "4/5" }}
          />
        </OverlayTrigger>
      )}
    </>
  );
};
