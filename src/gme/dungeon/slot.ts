import Point from "../../eng/point.js";
import Item from "../items/item.js";

export default class Slot {
  itemType: number;
  position: Point;
  item: Item;

  constructor(itemType: number, item: Item) {
    this.itemType = itemType;
    this.item = item;
    this.position = new Point();
  }
}