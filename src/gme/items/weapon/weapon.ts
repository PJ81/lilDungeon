import startEvent from "../../tools/startMsg.js";
import Equipment from "../equipment.js";

export default class Weapon extends Equipment {
  attack: number;
  attackMax: number;
  hitChance: number;

  constructor(name: string, type: number, idx: number) {
    super(name, type, idx);
  }

  getDamage(d: number) {
    this.health -= d;
    if (this.health < 1) {
      startEvent("Message", `Your ${this.name} is detroyed!`);
      return;
    }

    const ph = 100 * this.health / this.healthMax;
    this.attack = ~~(ph * this.attackMax / 100);
    if (this.attack < 1) this.attack = 1;
  }
}