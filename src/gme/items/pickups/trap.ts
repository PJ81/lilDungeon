import { lcg } from "../../../eng/const.js";
import Item from "../item.js";

export default class Trap extends Item {
  damage: number;

  constructor(slot: number) {
    super("Trap", slot);
    this.damage = lcg.rollDice(2, 3);
  }
}