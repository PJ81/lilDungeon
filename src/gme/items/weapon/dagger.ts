import { DAGGER } from "../../../eng/const.js";
import Weapon from "./weapon.js";

export default class Dagger extends Weapon {
  constructor(idx: number) {
    super("Dagger", DAGGER, idx);
    this.attack = 2;
    this.hitChance = 20;
    this.health = 1;
  }
}