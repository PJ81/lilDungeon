import Item from "./item.js";

export default class Equipment extends Item {
  health: number;

  constructor(name: string, slot: number) {
    super(name, slot);
    this.health = 0;
  }
}