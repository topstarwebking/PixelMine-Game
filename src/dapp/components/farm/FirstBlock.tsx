import React from "react";

import { Field } from "./Field";
import { ActionableItem, ORE, Square } from "../../types/contract";
import { FruitItem } from "../../types/fruits";

interface Props {
  land: Square[];
  balance: number;
  onHarvest: (landIndex: number) => void;
  onPlant: (landIndex: number) => void;
  selectedItem: ActionableItem;
  fruits: FruitItem[];
}

export const FirstBlock: React.FC<Props> = ({
  fruits,
  land,
  balance,
  onHarvest,
  onPlant,
  selectedItem,
}) => {
  const [showWatering, setShowWatering] = React.useState(false);
  const hasRendered = React.useRef(false);
  React.useEffect(() => {
    if (land[0].fruit === ORE.None) {
      setShowWatering(false);
    }

    // Only show it on first load
    if (!hasRendered.current && land[0].fruit !== ORE.None) {
      setShowWatering(true);
    }

    if (balance) {
      hasRendered.current = true;
    }
  }, [land, balance]);

  return (
    <>
      <div className="dirt" style={{ gridColumn: "3", gridRow: "4" }}>
        <Field
          fruits={fruits}
          balance={balance}
          selectedItem={selectedItem}
          square={land[3]}
          onClick={
            land[3].fruit === ORE.None ? () => onPlant(3) : () => onHarvest(3)
          }
        />
      </div>
      <div className="dirt" style={{ gridColumn: "3", gridRow: "5" }}>
        <Field
          fruits={fruits}
          balance={balance}
          selectedItem={selectedItem}
          square={land[0]}
          onClick={
            land[0].fruit === ORE.None ? () => onPlant(0) : () => onHarvest(0)
          }
        />
      </div>
      <div className="dirt" style={{ gridColumn: "4", top: "175px" }}>
        <Field
          fruits={fruits}
          balance={balance}
          selectedItem={selectedItem}
          square={land[4]}
          onClick={
            land[4].fruit === ORE.None ? () => onPlant(4) : () => onHarvest(4)
          }
        />
      </div>
      <div
        id="first-sunflower"
        className="dirt"
        style={{ gridColumn: "5", gridRow: "4" }}
      >
        <Field
          fruits={fruits}
          balance={balance}
          selectedItem={selectedItem}
          square={land[2]}
          onClick={
            land[2].fruit === ORE.None ? () => onPlant(2) : () => onHarvest(2)
          }
        />
      </div>

      <div className="dirt" style={{ gridColumn: "5", gridRow: "5" }}>
        <Field
          fruits={fruits}
          balance={balance}
          selectedItem={selectedItem}
          square={land[1]}
          onClick={
            land[1].fruit === ORE.None ? () => onPlant(1) : () => onHarvest(1)
          }
        />
      </div>

      <div className="dirt" style={{ gridColumn: "2", gridRow: "4" }} />
      <div className="dirt" style={{ gridColumn: "2", gridRow: "5" }} />
      <div className="dirt" style={{ gridColumn: "4", gridRow: "4" }} />
      <div className="dirt" style={{ gridColumn: "4", gridRow: "5" }} />
      <div className="dirt" style={{ gridColumn: "6", gridRow: "4" }} />
      <div className="dirt" style={{ gridColumn: "6", gridRow: "5" }} />
      <div className="dirt" style={{ gridColumn: "7", gridRow: "4" }} />
      <div className="dirt" style={{ gridColumn: "7", gridRow: "5" }} />
      <div className="dirt" style={{ gridColumn: "8", gridRow: "4" }} />
      <div className="dirt" style={{ gridColumn: "8", gridRow: "5" }} />
      <div className="dirt" style={{ gridColumn: "9", gridRow: "4" }} />
      <div className="dirt" style={{ gridColumn: "9", gridRow: "5" }} />
      <div className="dirt" style={{ gridColumn: "10", gridRow: "4" }} />
      <div className="dirt" style={{ gridColumn: "10", gridRow: "5" }} />
      <div className="dirt" style={{ gridColumn: "7", gridRow: "6" }} />
      <div className="dirt" style={{ gridColumn: "8", gridRow: "6" }} />
      <div className="dirt" style={{ gridColumn: "9", gridRow: "6" }} />
      <div className="dirt" style={{ gridColumn: "10", gridRow: "6" }} />
      <div className="dirt" style={{ gridColumn: "7", gridRow: "7" }} />
      <div className="dirt" style={{ gridColumn: "8", gridRow: "7" }} />
      <div className="dirt" style={{ gridColumn: "9", gridRow: "7" }} />
      <div className="dirt" style={{ gridColumn: "10", gridRow: "7" }} />
      <div className="stone" style={{ gridColumn: "2", gridRow: "7" }} />
      <div className="stone" style={{ gridColumn: "3", gridRow: "7" }} />
      <div className="stone" style={{ gridColumn: "4", gridRow: "7" }} />
      <div className="stone" style={{ gridColumn: "5", gridRow: "7" }} />
      <div className="stone" style={{ gridColumn: "6", gridRow: "7" }} />

      <div
        className="bottom-corner"
        style={{ gridColumn: "1", gridRow: "6" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "2", gridRow: "6" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "3", gridRow: "6" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "4", gridRow: "6" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "5", gridRow: "6" }}
      />
      <div
        className="bottom-edge"
        style={{ gridColumn: "6", gridRow: "6" }}
      />

      <div
        className="left-edge"
        style={{ gridColumn: "6", gridRow: "6" }}
      />

      <div
        className="top-corner2"
        style={{ gridColumn: "1", gridRow: "6" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "2", gridRow: "6" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "3", gridRow: "6" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "4", gridRow: "6" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "5", gridRow: "6" }}
      />
      <div
        className="top-edge"
        style={{ gridColumn: "6", gridRow: "6" }}
      />
    </>
  );
};
