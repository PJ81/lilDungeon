import { NO_POS, NO_TYPE } from "../../../eng/const.js";
import Weapon from "./weapon.js";

export default class BareHands extends Weapon {
  constructor() {
    super("Bare hands", NO_TYPE, NO_POS);
    this.healthMax = this.health = 1;
    this.attack = this.attackMax = 3;
    this.atkChance = 20;
  }

  takeDamage(d: number): boolean { return true; }
}