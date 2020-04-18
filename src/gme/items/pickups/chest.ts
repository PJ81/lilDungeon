import { CHEST, COIN } from "../../../eng/const.js";
import Coin from "./coin.js";
import Container from "./container.js";

export default class Chest extends Container {
  constructor(idx: number) {
    super("Chest", CHEST, idx);
  }

  createNewItem() {
    this.item = new Coin(this.slotIdx);
    this.itemType = COIN;
  }
}