import Big from "big.js";

import stone from "../images/ore/stone/fruit.png";
import coal from "../images/ore/coal/fruit.png";
import iron from "../images/ore/iron/fruit.png";
import bauxite from "../images/ore/bauxite/fruit.png";
import phospate from "../images/ore/phospate/fruit.png";
import silver from "../images/ore/silver/fruit.png";
import sulfur from "../images/ore/sulfur/fruit.png";
import gold from "../images/ore/gold/fruit.png";
import diamond from "../images/ore/diamond/fruit.png";

export enum ORE {
  None = "0",
  Stone = "1",
  Coal = "2",
  Iron = "3",
  Bauxite = "4",
  Phospate = "5",
  Sulfur = "6",
  Silver = "7",
  Gold = "8",
  Diamond = "9",
}

export interface FruitItem {
  fruit: ORE;
  name: string;
  image: string;
  buyPrice: number;
  sellPrice: number;
  landRequired: number;
  harvestMinutes: number;
}

export const FRUITS: FruitItem[] = [
  {
    fruit: ORE.Stone,
    name: "Stone",
    image: stone,
    buyPrice: 0.002,
    sellPrice: 0.004,
    landRequired: 5,
    harvestMinutes: 1,
  },
  {
    fruit: ORE.Coal,
    name: "Coal",
    image: coal,
    buyPrice: 0.02,
    sellPrice: 0.032,
    landRequired: 5,
    harvestMinutes: 5,
  },
  {
    fruit: ORE.Iron,
    name: "Iron",
    image: iron,
    buyPrice: 0.12,
    sellPrice: 0.24,
    landRequired: 8,
    harvestMinutes: 60,
  },
  {
    fruit: ORE.Bauxite,
    name: "Bauxite",
    image: bauxite,
    buyPrice: 0.2,
    sellPrice: 0.4,
    landRequired: 8,
    harvestMinutes: 2 * 60,
  },
  {
    fruit: ORE.Phospate,
    name: "Phospate",
    image: phospate,
    buyPrice: 0.4,
    sellPrice: 0.8,
    landRequired: 11,
    harvestMinutes: 4 * 60,
  },
  {
    fruit: ORE.Sulfur,
    name: "Sulfur",
    image: sulfur,
    buyPrice: 0.8,
    sellPrice: 1.6,
    landRequired: 14,
    harvestMinutes: 8 * 60,
  },
  {
    fruit: ORE.Silver,
    name: "Silver",
    image: silver,
    buyPrice: 1.2,
    sellPrice: 1.8,
    landRequired: 14,
    harvestMinutes: 6 * 60,
  },
  {
    fruit: ORE.Gold,
    name: "Gold",
    image: gold,
    buyPrice: 3,
    sellPrice: 6,
    landRequired: 17,
    harvestMinutes: 1 * 24 * 60,
  },
  {
    fruit: ORE.Diamond,
    name: "Diamond",
    image: diamond,
    buyPrice: 10,
    sellPrice: 18,
    landRequired: 17,
    harvestMinutes: 3 * 24 * 60,
  },
];

export function getFruit(fruit: ORE) {
  return FRUITS.find((item) => item.fruit === fruit);
}

// Apply the market rate against to get the current buy and sell prices
export function getMarketFruits(marketRate: number) {
  return FRUITS.map((fruit) => ({
    ...fruit,
    buyPrice: Big(fruit.buyPrice).div(marketRate).toNumber(),
    sellPrice: Big(fruit.sellPrice).div(marketRate).toNumber(),
  }));
}
