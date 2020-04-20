import { SWORD } from "../../../eng/const.js";
import Weapon from "./weapon.js";

export default class Sword extends Weapon {
  constructor(idx: number) {
    super("Sword", SWORD, idx);
    this.attack = 2;
    this.hitChance = 20;
    this.health = 1;
  }
}