import { LEATHER } from "../../../eng/const.js";
import Armor from "./armor.js";

export default class Leather extends Armor {
  constructor(idx: number) {
    super("Leather armor", LEATHER, idx);
    this.health = this.healthMax = 8;
    this.defense = this.defenseMax = 4;
    this.defChance = 50;
  }
}