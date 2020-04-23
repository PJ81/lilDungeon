import Equipment from "../equipment.js";

export default class Armor extends Equipment {
  defenseMax: number;
  defense: number;
  defChance: number;

  constructor(name: string, type: number, idx: number) {
    super(name, type, idx);
  }

  takeDamage(d: number): boolean {
    this.health -= d;
    if (this.health < 1) return false;

    const ph = 100 * this.health / this.healthMax;
    this.defense = ~~(ph * this.defenseMax / 100);
    return this.defense > 0;
  }
}