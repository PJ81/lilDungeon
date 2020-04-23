import { CHAINMAIL } from "../../../eng/const.js";
import Armor from "./armor.js";

export default class Chainmail extends Armor {
  constructor(idx: number) {
    super("Chainmail", CHAINMAIL, idx);
    this.health = this.healthMax = 10;
    this.defense = this.defenseMax = 8;
    this.defChance = 65;
  }
}