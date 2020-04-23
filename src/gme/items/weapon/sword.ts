import { SWORD } from "../../../eng/const.js";
import Weapon from "./weapon.js";

export default class Sword extends Weapon {
  constructor(idx: number) {
    super("Sword", SWORD, idx);
    this.healthMax = this.health = 12;
    this.attack = this.attackMax = 10;
    this.atkChance = 40;
  }
}