import { LEATHER } from "../../../eng/const.js";
import Armor from "./armor.js";

export default class Leather extends Armor {
  constructor(idx: number) {
    super("Leather", LEATHER, idx);
    this.defense = 2;
    this.health = 1;
    this.defChance = 15;
  }

  getDamage(d: number) {
    this.health -= d;
    if (this.health < 1) this.health = 1;
  }
}