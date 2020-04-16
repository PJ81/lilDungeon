import Edible from "./edible.js";
import { lcg } from "../../../eng/const.js";

export default class Food extends Edible {

  constructor(slot: number) {
    super("Food", slot);
    this.health = lcg.rollDice(1, 3);
  }
}