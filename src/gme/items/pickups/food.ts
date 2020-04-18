import { FOOD, lcg } from "../../../eng/const.js";
import Edible from "./edible.js";

export default class Food extends Edible {

  constructor(idx: number) {
    super("Food", FOOD, idx);
    this.health = lcg.rollDice(1, 3);
  }
}