import Container from "./container.js";
import Coin from "./coin.js";
import { COINS } from "../../../eng/const.js";

export default class Chest extends Container {
  constructor(slot: number) {
    super("Chest", slot);
  }

  createNewItem() {
    this.item = new Coin(this.slot);
    this.itemType = COINS;
  }
}