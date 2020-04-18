import Item from "./item.js";

export default class Equipment extends Item {
  health: number;

  constructor(name: string, type: number, idx: number) {
    super(name, type, idx);
    this.health = 0;
  }
}