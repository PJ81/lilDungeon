import { lcg } from "../../../eng/const.js";
import Edible from "./edible.js";

export default class Potion extends Edible {
  constructor(slot: number) {
    super("Potion", slot);
    this.health = lcg.rollDice(2, 3);
  }
}