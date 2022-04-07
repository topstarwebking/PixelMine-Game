import { Item, items } from "./crafting";
import { FruitItem, FRUITS, ORE } from "./fruits";

export { ORE };

export enum Charity {
  TheWaterProject = "0x060697E9d4EEa886EbeCe57A974Facd53A40865B",
  Heifer = "0xD3F81260a44A1df7A7269CF66Abd9c7e4f8CdcD1",
  CoolEarth = "0x3c8cB169281196737c493AfFA8F49a9d823bB9c5",
}

export interface Donation {
  charity: Charity;
  value: string;
}
export interface Square {
  fruit: ORE;
  createdAt: number;
}

export interface Transaction {
  fruit: ORE;
  createdAt: number;
  action: Action;
  landIndex: number;
}

export enum Action {
  Plant = 0,
  Harvest = 1,
}

export type ActionableItem = FruitItem | Item;

export function isFruit(item: ActionableItem): item is FruitItem {
  // return (item as Item).address == "";
  return true;
}

export const ACTIONABLE_ITEMS = [...FRUITS, ...items];
