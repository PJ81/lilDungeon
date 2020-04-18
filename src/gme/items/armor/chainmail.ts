import { CHAINMAIL } from "../../../eng/const.js";
import Armor from "./armor.js";

export default class Chainmail extends Armor {
  constructor(idx: number) {
    super("Chainmail", CHAINMAIL, idx);
    this.defense = 2;
    this.health = 1;
    this.defChance = 15;
  }

  getDamage(d: number) {
    this.health -= d;
    if (this.health < 1) this.health = 1;
  }
}