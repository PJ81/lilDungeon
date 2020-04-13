import Entity from "../entity.js";

export default class Monster extends Entity {
  slot: number;

  constructor(name: string, slot: number) {
    super(name);
    this.slot = slot;
  }
}