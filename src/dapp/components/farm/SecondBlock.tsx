import React from "react";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import soil from "../../images/land/soil/locked.png";

import { UpgradeOverlay } from "../ui/UpgradeModal";

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

export const SecondLand: React.FC<Props> = ({
  fruits,
  land,
  balance,
  onHarvest,
  onPlant,
  selectedItem,
}) => {
  const isUnlocked = land.length > 5;
  const hasRendered = React.useRef(false);
  React.useEffect(() => {
    if (!isUnlocked) {
      return;
    }

    if (balance) {
      hasRendered.current = true;
    }
  }, [land, balance]);

  return (
    <>
      <div className="dirt" style={{ gridColumn: "11", gridRow: "5" }}>
        {/* {showWatering && <img id="watering2" src={watering} />} */}
        {isUnlocked ? (
          <Field
            fruits={fruits}
            balance={balance}
            selectedItem={selectedItem}
            square={land[5]}
            onClick={
              land[5].fruit === ORE.None
                ? () => onPlant(5)
                : () => onHarvest(5)
            }
          />
        ) : (
          <div className="field">
            <img src={soil} alt="" />
          </div>
        )}
      </div>
      <div className="dirt" style={{ gridColumn: "12", gridRow: "4" }}>
        {isUnlocked ? (
          <Field
            fruits={fruits}
            balance={balance}
            selectedItem={selectedItem}
            square={land[6]}
            onClick={
              land[6].fruit === ORE.None
                ? () => onPlant(6)
                : () => onHarvest(6)
            }
          />
        ) : (
          <div className="field">
            <img src={soil} alt="" />
          </div>
        )}
      </div>
      <div className="dirt" style={{ gridColumn: "13", gridRow: "5" }}>
        {isUnlocked ? (
          <Field
            fruits={fruits}
            balance={balance}
            selectedItem={selectedItem}
            square={land[7]}
            onClick={
              land[7].fruit === ORE.None
                ? () => onPlant(7)
                : () => onHarvest(7)
            }
          />
        ) : (
          <div className="field">
            <img src={soil} alt="" />
          </div>
        )}
      </div>

      {/* Dirt Around */}
      <div className="dirt" style={{ gridColumn: "11", gridRow: "4" }} />
      <div className="dirt" style={{ gridColumn: "13", gridRow: "4" }} />
      <div className="dirt" style={{ gridColumn: "12", gridRow: "5" }} />

      {/* Fence */}
      <div
        className="top-corner"
        style={{ gridColumn: "14", gridRow: "2" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "14", gridRow: "3" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "14", gridRow: "4" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "14", gridRow: "5" }}
      />
      <div
        className="bottom-corner2"
        style={{ gridColumn: "14", gridRow: "6" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "13", gridRow: "6" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "12", gridRow: "6" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "11", gridRow: "6" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "11", gridRow: "6" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "11", gridRow: "6" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "12", gridRow: "6" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "13", gridRow: "6" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "14", gridRow: "6" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "15", gridRow: "6" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "16", gridRow: "6" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "16", gridRow: "6" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "16", gridRow: "6" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "15", gridRow: "6" }}
      />
      <div
        className="bottom-corner"
        style={{ gridColumn: "14", gridRow: "6" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "14", gridRow: "5" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "14", gridRow: "4" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "14", gridRow: "3" }}
      />
      <div
        className="top-corner2"
        style={{ gridColumn: "14", gridRow: "2" }}
      />

      {/* Fence-2 */}
      <div
        className="bottom-corner2"
        style={{ gridColumn: "14", gridRow: "10" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "13", gridRow: "10" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "12", gridRow: "10" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "11", gridRow: "10" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "11", gridRow: "10" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "11", gridRow: "11" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "11", gridRow: "12" }}
      />
      <div
        className="right-edge"
        style={{ gridColumn: "11", gridRow: "13" }}
      />

      <div
        className="bottom-corner2"
        style={{ gridColumn: "11", gridRow: "14" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "11", gridRow: "11" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "11", gridRow: "12" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "11", gridRow: "13" }}
      />
      {/* <div
        className="left-edge"
        style={{ gridColumn: "11", gridRow: "14" }}
      /> */}
      <div
        className="bottom-corner"
        style={{ gridColumn: "11", gridRow: "14" }}
      />
      <div
        className="top-corner2"
        style={{ gridColumn: "11", gridRow: "10" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "12", gridRow: "10" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "13", gridRow: "10" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "14", gridRow: "10" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "15", gridRow: "10" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "16", gridRow: "10" }}
      />
      <div
        className="left-edge"
        style={{ gridColumn: "16", gridRow: "10" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "16", gridRow: "10" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "15", gridRow: "10" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "14", gridRow: "10" }}
      />
 
      {!isUnlocked && (
        <OverlayTrigger
          overlay={UpgradeOverlay}
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
        >
          <div
            className="upgrade-overlay"
            style={{ gridColumn: "11/13", gridRow: "4/5" }}
          />
        </OverlayTrigger>
      )}
    </>
  );
};
