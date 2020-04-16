import Item from "../item.js";

export default class Edible extends Item {
  health: number;

  constructor(name: string, slot: number) {
    super(name, slot);
    this.health = 0;
  }
}