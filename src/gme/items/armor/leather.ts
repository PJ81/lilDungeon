import Armor from "./armor.js";

export default class Leather extends Armor {
  constructor(slot: number) {
    super("Leather", slot);
    this.defense = 2;
    this.health = 1;
    this.defChance = 15;
  }

  getDamage(d: number) {
    this.health -= d;
    if (this.health < 1) this.health = 1;
  }
}