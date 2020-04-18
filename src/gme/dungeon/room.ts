import Point from "../../eng/point.js";
import Item from "../items/item.js";

export default class Room {
  pos: Point;
  neighbours: Room[];
  items: Item[];
  visited: boolean;
  painted: boolean;

  constructor() {
    this.pos = new Point();
    this.neighbours = new Array(4);
    this.items = new Array(8);
    this.visited = this.painted = false;
  }
}