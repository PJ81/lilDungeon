import { NO_POS, NO_TYPE } from "../../../eng/const.js";
import Armor from "./armor.js";

export default class CottonShirt extends Armor {
  constructor() {
    super("Cotton shirt", NO_TYPE, NO_POS);
    this.defense = 2;
    this.health = 1;
    this.defChance = 15;
  }

  getDamage(d: number) {
    //
  }
}