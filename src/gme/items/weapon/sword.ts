import { SWORD } from "../../../eng/const.js";
import Weapon from "./weapon.js";

export default class Sword extends Weapon {
  constructor(idx: number) {
    super("Sword", SWORD, idx);
    this.attack = this.attackMax = 10;
    this.hitChance = 40;
    this.healthMax = this.health = 12;
  }
}