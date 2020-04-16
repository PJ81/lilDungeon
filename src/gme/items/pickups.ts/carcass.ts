import Container from "./container.js";
import Item from "../item.js";
import Trap from "./trap.js";
import { TRAP } from "../../../eng/const.js";

export default class Carcass extends Container {
  constructor(slot: number) {
    super("Carcass", slot);
  }

  createNewItem() {
    this.item = new Trap(this.slot);
    this.itemType = TRAP;
  }
}