import { COIN, lcg } from "../../../eng/const.js";
import Item from "../item.js";

export default class Coin extends Item {
  count: number;

  constructor(idx: number) {
    super("Coin", COIN, idx);
    this.count = lcg.rollDice(3, 5);
  }
}