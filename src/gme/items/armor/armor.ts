import Equipment from "../equipment.js";

export default class Armor extends Equipment {
  getDamage(d: number) {
    throw new Error("Method not implemented.");
  }

  defense: number;
  defChance: number;

  constructor(name: string) {
    super(name);
  }
}