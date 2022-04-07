import React from "react";

import "./Land.css";

import { Square, ActionableItem } from "../../types/contract";

import { Barn } from "./Barn";
import { FruitBoard } from "./FruitBoard";
import { InventoryBoard } from "./InventoryBoard";
import { FirstBlock } from "./FirstBlock";
import { SecondLand } from "./SecondBlock";
import { ThirdBlock } from "./ThirdBlock";
import { FourthBlock } from "./FourthBlock";
import { FifthBlock } from "./FifthBlock";
import { Tiles } from "./Tiles";
import { AssetsTiles } from "./AssetsTiles";
import { Blacksmith } from "./Blacksmith";
import { Market } from "./Market";
import { Reward } from "./Reward";
import { AvaxReward } from "./AvaxReward";
import { FruitItem } from "../../types/fruits";
import { Inventory } from "../../types/crafting";

interface Props {
  land: Square[];
  balance: number;
  onSelectItem: (item: ActionableItem) => void;
  onHarvest: (landIndex: number) => void;
  onPlant: (landIndex: number) => void;
  selectedItem: ActionableItem;
  fruits: FruitItem[];
  account?: string;
  inventory: Inventory;
  totalItemSupplies: Inventory;
}

const columns = Array(60).fill(null);
const rows = Array(20).fill(null);

export const Land: React.FC<Props> = ({
  fruits,
  land,
  balance,
  onSelectItem,
  onHarvest,
  onPlant,
  selectedItem,
  account,
  inventory,
  totalItemSupplies,
}) => {
  return (
    <>
      {columns.map((_, column) =>
        rows.map((_, row) =>
          (column + row) % 2 ? null : (
            <div
              className="grass"
              style={{
                position: "absolute",
                left: `calc(${(column - 25) * 62.5}px + 18px)`,
                top: `${row * 62.5}px`,
                width: "62.5px",
                height: "62.5px",
                background: "#073763",
              }}
            />
          )
        )
      )}
      <div className="farm">
        <FirstBlock
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />
        <SecondLand
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />
        <ThirdBlock
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />
        <FourthBlock
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />
        <FifthBlock
          fruits={fruits}
          selectedItem={selectedItem}
          land={land}
          balance={balance}
          onHarvest={onHarvest}
          onPlant={onPlant}
        />

        {/* <Trees inventory={inventory} /> */}
        {/* <Stones inventory={inventory} /> */}
        {/* <Iron inventory={inventory} /> */}
        {/* <Gold inventory={inventory} /> */}

        {/* <Chickens inventory={inventory} /> */}
        {/* <NFTs inventory={inventory} /> */}
        <Tiles />
        <AssetsTiles />
        <Market />
        <FruitBoard
          fruits={fruits}
          selectedItem={selectedItem}
          onSelectItem={onSelectItem}
          land={land}
          balance={balance}
          inventory={inventory}
        />
        <InventoryBoard
          fruits={fruits}
          selectedItem={selectedItem}
          onSelectItem={onSelectItem}
          land={land}
          balance={balance}
          inventory={inventory}
        />
        <Barn farmSize={land.length} balance={balance} />
        <Reward account={account} />
        <AvaxReward account={account} />
        <Blacksmith
          inventory={inventory}
          totalItemSupplies={totalItemSupplies}
          balance={balance}
        />
        {/* {
                    land.map((square, index) => (
                        <Field square={square} onClick={square.fruit === ORE.None ? () => onPlant(index) : () => onHarvest(index)}/> 
                    ))
                } */}
      </div>

      {/* Water */}
      {/* {new Array(50).fill(null).map((_, index) => (
        <img
          className="water-edge"
          src={waterEdge}
          style={{
            position: "absolute",
            left: `${index * 62.5}px`,
          }}
        />
      ))} */}

      {/* <div id="water" /> */}
    </>
  );
};
