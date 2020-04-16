import Edible from "./edible.js";
import { lcg } from "../../../eng/const.js";

export default class Potion extends Edible {
  constructor(slot: number) {
    super("Potion", slot);
    this.health = lcg.rollDice(2, 3);
  }
}