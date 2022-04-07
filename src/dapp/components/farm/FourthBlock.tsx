import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { UpgradeOverlay } from "../ui/UpgradeModal";

import soil from "../../images/land/soil/locked.png";
import { ActionableItem, ORE, Square } from "../../types/contract";

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

export const FourthBlock: React.FC<Props> = ({
  fruits,
  land,
  balance,
  onHarvest,
  onPlant,
  selectedItem,
}) => {
  const isUnlocked = land.length > 11;

  return (
    <>
      <div className="dirt" style={{ gridColumn: "13", gridRow: "13" }}>
        {isUnlocked ? (
          <Field
            fruits={fruits}
            balance={balance}
            selectedItem={selectedItem}
            square={land[11]}
            onClick={
              land[11].fruit === ORE.None
                ? () => onPlant(11)
                : () => onHarvest(11)
            }
          />
        ) : (
          <div className="field">
            <img src={soil} alt="" />
          </div>
        )}
      </div>
      <div className="dirt" style={{ gridColumn: "14", gridRow: "12" }}>
        {isUnlocked ? (
          <Field
            fruits={fruits}
            balance={balance}
            selectedItem={selectedItem}
            square={land[12]}
            onClick={
              land[12].fruit === ORE.None
                ? () => onPlant(12)
                : () => onHarvest(12)
            }
          />
        ) : (
          <div className="field">
            <img src={soil} alt="" />
          </div>
        )}
      </div>
      <div className="dirt" style={{ gridColumn: "15", gridRow: "13" }}>
        {isUnlocked ? (
          <Field
            fruits={fruits}
            balance={balance}
            selectedItem={selectedItem}
            square={land[13]}
            onClick={
              land[13].fruit === ORE.None
                ? () => onPlant(13)
                : () => onHarvest(13)
            }
          />
        ) : (
          <div className="field">
            <img src={soil} alt="" />
          </div>
        )}
      </div>

      {/* Dirt & Fence */}

      <div className="stone" style={{ gridColumn: "2", gridRow: "11" }} />
      <div className="stone" style={{ gridColumn: "3", gridRow: "11" }} />
      <div className="stone" style={{ gridColumn: "4", gridRow: "11" }} />
      <div className="stone" style={{ gridColumn: "5", gridRow: "11" }} />
      <div className="stone" style={{ gridColumn: "6", gridRow: "11" }} />

      {/* <div className="stone" style={{ gridColumn: "11", gridRow: "11" }} /> */}
      <div className="stone" style={{ gridColumn: "12", gridRow: "11" }} />
      <div className="stone" style={{ gridColumn: "13", gridRow: "11" }} />
      <div className="stone" style={{ gridColumn: "14", gridRow: "11" }} />
      <div className="stone" style={{ gridColumn: "15", gridRow: "11" }} />
      <div className="stone" style={{ gridColumn: "16", gridRow: "11" }} />

      <div className="dirt" style={{ gridColumn: "7", gridRow: "10" }} />
      <div className="dirt" style={{ gridColumn: "8", gridRow: "10" }} />
      <div className="dirt" style={{ gridColumn: "9", gridRow: "10" }} />
      <div className="dirt" style={{ gridColumn: "10", gridRow: "10" }} />

      <div className="dirt" style={{ gridColumn: "7", gridRow: "11" }} />
      <div className="dirt" style={{ gridColumn: "8", gridRow: "11" }} />
      <div className="dirt" style={{ gridColumn: "9", gridRow: "11" }} />
      <div className="dirt" style={{ gridColumn: "10", gridRow: "11" }} />

      <div className="dirt" style={{ gridColumn: "17", gridRow: "10" }} />
      <div className="dirt" style={{ gridColumn: "18", gridRow: "10" }} />
      <div className="dirt" style={{ gridColumn: "19", gridRow: "10" }} />

      <div className="dirt" style={{ gridColumn: "17", gridRow: "11" }} />
      <div className="dirt" style={{ gridColumn: "18", gridRow: "11" }} />
      <div className="dirt" style={{ gridColumn: "19", gridRow: "11" }} />

      <div className="dirt" style={{ gridColumn: "2", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "3", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "4", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "5", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "6", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "7", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "8", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "9", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "10", gridRow: "12" }} />

      <div className="dirt" style={{ gridColumn: "12", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "13", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "14", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "15", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "16", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "17", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "18", gridRow: "12" }} />
      <div className="dirt" style={{ gridColumn: "19", gridRow: "12" }} />

      <div className="dirt" style={{ gridColumn: "2", gridRow: "13" }} />
      <div className="dirt" style={{ gridColumn: "3", gridRow: "13" }} />
      {/* <div className="dirt" style={{ gridColumn: "2", gridRow: "14" }} />
      <div className="dirt" style={{ gridColumn: "4", gridRow: "14" }} /> */}
      <div className="dirt" style={{ gridColumn: "5", gridRow: "13" }} />
      <div className="dirt" style={{ gridColumn: "6", gridRow: "13" }} />
      <div className="dirt" style={{ gridColumn: "7", gridRow: "13" }} />
      <div className="dirt" style={{ gridColumn: "8", gridRow: "13" }} />
      <div className="dirt" style={{ gridColumn: "9", gridRow: "13" }} />
      <div className="dirt" style={{ gridColumn: "10", gridRow: "13" }} />

      {/* <div className="dirt" style={{ gridColumn: "6", gridRow: "14" }} />
      <div className="dirt" style={{ gridColumn: "7", gridRow: "14" }} />
      <div className="dirt" style={{ gridColumn: "8", gridRow: "14" }} />
      <div className="dirt" style={{ gridColumn: "9", gridRow: "14" }} />
      <div className="dirt" style={{ gridColumn: "10", gridRow: "14" }} /> */}

      <div className="dirt" style={{ gridColumn: "12", gridRow: "13" }} />
      <div className="dirt" style={{ gridColumn: "13", gridRow: "13" }} />
      {/* <div className="dirt" style={{ gridColumn: "12", gridRow: "14" }} />
      <div className="dirt" style={{ gridColumn: "14", gridRow: "14" }} />
      <div className="dirt" style={{ gridColumn: "15", gridRow: "13" }} /> */}
      <div className="dirt" style={{ gridColumn: "16", gridRow: "13" }} />
      <div className="dirt" style={{ gridColumn: "17", gridRow: "13" }} />
      <div className="dirt" style={{ gridColumn: "18", gridRow: "13" }} />
      <div className="dirt" style={{ gridColumn: "19", gridRow: "13" }} />
      <div className="dirt" style={{ gridColumn: "19", gridRow: "13" }} />
      <div className="dirt" style={{ gridColumn: "4", gridRow: "13" }} />
      <div className="dirt" style={{ gridColumn: "14", gridRow: "13" }} />

      {/* <div className="dirt" style={{ gridColumn: "16", gridRow: "14" }} />
      <div className="dirt" style={{ gridColumn: "17", gridRow: "14" }} />
      <div className="dirt" style={{ gridColumn: "18", gridRow: "14" }} />
      <div className="dirt" style={{ gridColumn: "19", gridRow: "14" }} /> */}

      {!isUnlocked && (
        <OverlayTrigger
          overlay={UpgradeOverlay}
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
        >
          <div
            className="upgrade-overlay"
            style={{ gridColumn: "13/15", gridRow: "12/13" }}
          />
        </OverlayTrigger>
      )}
    </>
  );
};
