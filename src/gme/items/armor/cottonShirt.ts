import { NO_POS, NO_TYPE } from "../../../eng/const.js";
import Armor from "./armor.js";

export default class CottonShirt extends Armor {
  constructor() {
    super("Cotton shirt", NO_TYPE, NO_POS);
    this.healthMax = this.health = 1;
    this.defense = this.defenseMax = 2;
    this.defChance = 15;
  }

  takeDamage(d: number): boolean { return true; }
}