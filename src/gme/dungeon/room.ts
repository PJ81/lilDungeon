import Point from "../../eng/point.js";
import Item from "../items/item.js";

export default class Room {
  position: Point;
  neighbours: Room[];
  items: Item[];
  visited: boolean;
  painted: boolean;
  hasStairs: boolean;
  locked: boolean;
  lock: (l: boolean) => boolean;

  constructor() {
    this.position = new Point();
    this.neighbours = new Array(4);
    this.items = new Array(8);
    this.locked = this.hasStairs = this.visited = this.painted = false;

    this.lock = (l: boolean) => this.locked = l;
  }

  getNeighboursCount(): number {
    let d = 0;
    for (let z = 0; z < 4; z++) {
      if (this.neighbours[z]) d++;
    }
    return d;
  }

  clearItems() {
    for (let s = 0; s < 8; s++) {
      this.items[s] = null;
    }
  }
}