import { lcg, POTION } from "../../../eng/const.js";
import Edible from "./edible.js";

export default class Potion extends Edible {
  constructor(idx: number) {
    super("Potion", POTION, idx);
    this.health = lcg.rollDice(2, 3);
  }
}