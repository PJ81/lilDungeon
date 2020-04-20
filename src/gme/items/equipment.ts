import Item from "./item.js";

export default class Equipment extends Item {
  health: number;
  healthMax: number;

  constructor(name: string, type: number, idx: number) {
    super(name, type, idx);
    this.healthMax = this.health = 0;
  }
}