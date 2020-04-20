import startEvent from "../../tools/startMsg.js";
import Equipment from "../equipment.js";

export default class Armor extends Equipment {
  defense: number;
  defChance: number;

  constructor(name: string, type: number, idx: number) {
    super(name, type, idx);
  }

  getDamage(d: number) {
    this.health -= d;
    if (this.health < 1) {
      startEvent("Message", `Your ${this.name} is detroyed!`);
    }
  }
}