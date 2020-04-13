import Item from "./item.js";

export default class Equipment extends Item {
  health: number;

  constructor(name: string) {
    super(name);
    this.health = 0;
  }
}