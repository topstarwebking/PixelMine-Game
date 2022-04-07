import React from "react";

import coin from "../../images/ui/icon.png";
import stopwatch from "../../images/ui/stopwatch.png";

import { FruitItem } from "../../types/fruits";
import { ActionableItem, isFruit } from "../../types/contract";
import { Inventory } from "../../types/crafting";

import { Box } from "./Box";

import "./Inventory.css";
import { secondsToString } from "../../utils/time";

interface Props {
  selectedItem: ActionableItem;
  onSelectItem: (item: ActionableItem) => void;
  balance: number;
  land: any[];
  fruits: FruitItem[];
  inventory: Inventory;
}

export const Plants: React.FC<Props> = ({
  selectedItem,
  onSelectItem,
  balance,
  land,
  fruits,
  inventory,
}) => {
  let plant = isFruit(selectedItem) && selectedItem;

  // Grab the market price plant
  if (plant) {
    plant = fruits.find((f) => f.fruit === plant.fruit);
  }

  const calculateHarvestTime = () => {
    if (plant.name == "Phospate") {
      if (inventory.Axe) return (plant.harvestMinutes * 60) / 3;
    }
    if (plant.name == "Sulfur") {
      if (inventory.Hammer) return (plant.harvestMinutes * 60) / 3;
    }
    if (plant.name == "Diamond") {
      if (inventory.Drill) return (plant.harvestMinutes * 60) / 3;
    }
    return plant.harvestMinutes * 60;
  };

  return (
    <div id="crafting">
      <div id="crafting-left">
        <div id="crafting-items">
          {fruits.map((fruit) =>
            fruit.landRequired > land.length ? (
              <Box disabled>
                <img
                  src={fruit.image}
                  className="box-item"
                  style={{ opacity: 0.3 }}
                  alt=""
                />
              </Box>
            ) : (
              <Box
                isSelected={fruit.fruit === plant.fruit}
                onClick={() => onSelectItem(fruit)}
              >
                <img src={fruit.image} className="box-item" alt="" />
              </Box>
            )
          )}
        </div>
        {/* <a
          href="https://docs.sunflower-farmers.com/plant-guide"
          target="_blank"
        >
          <h3 className="current-price-supply-demand">Read more</h3>
        </a> */}
      </div>
      <div id="recipe">
        {plant && (
          <>
            <span id="recipe-title">{plant.name}</span>
            <div id="crafting-item">
              <img src={plant.image} alt="" />
            </div>

            <div id="ingredients">
              <div className="ingredient">
                <div>
                  <img
                    className="ingredient-image"
                    src={stopwatch}
                    alt=""
                  />
                  <span className="ingredient-count">Time</span>
                </div>
                <span className="ingredient-text">
                  {secondsToString(calculateHarvestTime())}
                </span>
              </div>
              <div id="plant-to-harvest">
                <img className="ingredient-image" src={coin} alt="" />
                <span>Prices</span>
              </div>

              <div className="ingredient">
                <div>
                  <span className="ingredient-count">Plant</span>
                </div>
                <span className="ingredient-text">{`${plant.buyPrice} $PIMI`}</span>
              </div>
              <div className="ingredient">
                <div>
                  <span className="ingredient-count">Mined</span>
                </div>
                <span className="ingredient-text">{`${plant.sellPrice} $PIMI `}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
