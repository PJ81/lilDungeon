import { DAGGER } from "../../../eng/const.js";
import Weapon from "./weapon.js";

export default class Dagger extends Weapon {
  constructor(idx: number) {
    super("Dagger", DAGGER, idx);
    this.healthMax = this.health = 8;
    this.attack = this.attackMax = 6;
    this.atkChance = 30;
  }
}