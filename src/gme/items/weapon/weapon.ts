import Equipment from "../equipment.js";

export default class Weapon extends Equipment {
  attack: number;
  attackMax: number;
  atkChance: number;

  constructor(name: string, type: number, idx: number) {
    super(name, type, idx);
  }

  takeDamage(d: number): boolean {
    this.health -= d;
    if (this.health < 1) return false;

    const ph = 100 * this.health / this.healthMax;
    this.attack = ~~(ph * this.attackMax / 100);
    return this.attack > 0;
  }
}