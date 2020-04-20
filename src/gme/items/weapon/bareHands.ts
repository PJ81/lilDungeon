import { NO_POS, NO_TYPE } from "../../../eng/const.js";
import Weapon from "./weapon.js";

export default class BareHands extends Weapon {
  constructor() {
    super("Bare hands", NO_TYPE, NO_POS);
    this.attack = 2;
    this.hitChance = 20;
    this.health = 1;
  }

  getDamage(d: number) {
    //
  }
}