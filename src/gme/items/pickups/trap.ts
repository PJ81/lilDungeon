import { lcg, TRAP } from "../../../eng/const.js";
import Item from "../item.js";

export default class Trap extends Item {
  damage: number;

  constructor(idx: number) {
    super("Trap", TRAP, idx);
    this.damage = lcg.rollDice(2, 3);
  }
}