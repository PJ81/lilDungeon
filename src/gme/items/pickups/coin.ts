import { lcg } from "../../../eng/const.js";
import Item from "../item.js";

export default class Coin extends Item {
  count: number;

  constructor(slot: number) {
    super("Coin", slot);
    this.count = lcg.rollDice(3, 5);
  }
}