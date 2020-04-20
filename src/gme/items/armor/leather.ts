import { LEATHER } from "../../../eng/const.js";
import Armor from "./armor.js";

export default class Leather extends Armor {
  constructor(idx: number) {
    super("Leather armor", LEATHER, idx);
    this.defense = 2;
    this.health = 1;
    this.defChance = 15;
  }
}