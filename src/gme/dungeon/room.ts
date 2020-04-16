import Point from "../../eng/point.js";
import Slot from "./slot.js";

export default class Room {
  pos: Point;
  neighbours: Room[];
  slots: Slot[];
  visited: boolean;
  painted: boolean;

  constructor() {
    this.pos = new Point();
    this.neighbours = new Array(4);
    this.slots = new Array(8);
    this.visited = this.painted = false;
  }
}