import Equipment from "../equipment.js";

export default class Weapon extends Equipment {
  getDamage(d: number) {
    throw new Error("Method not implemented.");
  }

  attack: number;
  hitChance: number;

  constructor(name: string, slot: number) {
    super(name, slot);
  }
}