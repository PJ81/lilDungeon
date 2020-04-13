import Point from "../../eng/point.js";
import Item from "../items/item.js";

export default class Slot {
  itemType: number;
  pos: Point;
  item: Item;

  constructor(itemType: number, item: Item) {
    this.itemType = itemType;
    this.item = item;
    this.pos = new Point();
  }
}