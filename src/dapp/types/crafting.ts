import Helmet from "../../abis/HELMET.json";
import Drill from "../../abis/Drill.json";
import Axe from "../../abis/Axe.json";
import Shovel from "../../abis/Shovel.json";
import Hammer from "../../abis/Hammer.json";

import shovel from "../images/ui/shovel.png";
import axe from "../images/ui/axe.png";
import drill from "../images/ui/drill.png";
import hammer from "../images/ui/hammer.png";
import helmet from "../images/ui/helmet.png";
import coin from "../images/ui/icon.png";
import bnb from "../images/ui/coin-avax.png";
import busd from "../images/ui/coin-avax.png";

export interface Ingredient {
  name: "$AVAX";
  image: any;
  amount: number;
}

export interface Recipe extends Item {
  ingredients: Ingredient[];
}

export interface Item {
  name: "Axe" | "Hammer" | "Drill" | "Shovel" | "Helmet";
  description: string;
  address: string;
  image: any;
  type: "ERC20" | "NFT";
  isLocked?: boolean;
  supply?: number;
  limit?: number;
  abi?: any;
  openSeaLink?: string;
}

export const recipes: Recipe[] = [
  {
    name: "Axe",
    description: "Axe makes 3x faster Phospate",
    image: axe,
    type: "NFT",
    address: "0x1831b202eD556C37b6eB6C00c78e9E9A3900c6EC",
    ingredients: [
      {
        name: "$AVAX",
        amount: 2.5,
        image: busd,
      },
    ],
    abi: Axe,
    supply: 2000,
  },
  {
    name: "Hammer",
    description: "Hammer makes 3x faster Sulfur",
    image: hammer,
    type: "NFT",
    address: "0x82845A626958454777E16247e807Cc84a0c872fA",
    ingredients: [
      {
        name: "$AVAX",
        amount: 2.5,
        image: busd,
      },
    ],
    abi: Hammer,
    supply: 2000,
  },
  {
    name: "Drill",
    description: "Drill makes 3x faster Diamonds",
    image: drill,
    type: "NFT",
    address: "0x65185EF626DDC7312dE625dCaaaeE1BfA66246A5",
    ingredients: [
      {
        name: "$AVAX",
        amount: 2.5,
        image: busd,
      },
    ],
    abi: Drill,
    supply: 2000,
  },
  {
    name: "Shovel",
    description: "Shovel owners get chests every 3days",
    image: shovel,
    type: "NFT",
    address: "0x0648D77453E8b358fe6567749fB638d94Aa1CC44",
    ingredients: [
      {
        name: "$AVAX",
        amount: 4,
        image: busd,
      },
    ],
    abi: Shovel,
    supply: 1000,
  },
  {
    name: "Helmet",
    description:
      "HELMET let user get AVAX rewards from pool and every minted NFT for free",
    image: helmet,
    type: "NFT",
    address: "0x9CA455Ed55754A1b9c31bfE235284CAe358BC353",
    ingredients: [
      {
        name: "$AVAX",
        amount: 5,
        image: bnb,
      },
    ],
    abi: Helmet,
    supply: 1000,
  },
];

export const items: Item[] = [...recipes];

export type Inventory = Record<ItemName, number>;

export const DEFAULT_INVENTORY: Inventory = {
  Axe: 0,
  Hammer: 0,
  Drill: 0,
  Shovel: 0,
  Helmet: 0,
};
export type ItemName = Item["name"];
