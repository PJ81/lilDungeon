import Weapon from "./weapon.js";

export default class BareHands extends Weapon {
  constructor(name: string) {
    super(name);
    this.attack = 2;
    this.hitChance = 20;
    this.health = 1;
  }

  getDamage(d: number) {
    this.health -= d;
    if (this.health < 1) this.health = 1;
  }
}