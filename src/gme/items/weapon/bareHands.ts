import { NO_POS, NO_TYPE } from "../../../eng/const.js";
import Weapon from "./weapon.js";

export default class BareHands extends Weapon {
  constructor() {
    super("Bare hands", NO_TYPE, NO_POS);
    this.attack = this.attackMax = 3;
    this.hitChance = 20;
    this.healthMax = this.health = 1;
  }

  getDamage(d: number) { }
}