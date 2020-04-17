import { TRAP } from "../../../eng/const.js";
import Container from "./container.js";
import Trap from "./trap.js";

export default class Carcass extends Container {
  constructor(slot: number) {
    super("Carcass", slot);
  }

  createNewItem() {
    this.item = new Trap(this.slotIdx);
    this.itemType = TRAP;
  }
}