import * as Const from "../../eng/const.js";
import Room from "./room.js";
import Resources from "../../eng/resources.js";
import Point from "../../eng/point.js";
import Slot from "./slot.js";

export default class CurrentRoom {
  room: Room;
  ctx: CanvasRenderingContext2D;
  res: Resources;
  img: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D) {//, callBack: Function) {
    this.ctx = ctx;
    this.res = new Resources();

    this.res.loadImages(["tiles.png"], () => {
      this.img = this.res.images[0];
      () => { };
    });
  }

  updateRoom(i: number) {
    this.setRoom(this.room.neighbours[i]);
  }

  clearSlot(i: number) {
    this.room.slots[i] = null;
  }

  getSlot(i: number): Slot {
    return this.room.slots[i];
  }

  setRoom(r: Room) {
    if (!r) return;
    this.room = r;
    this.room.visited = true;
  }

  draw() {
    const ts = Const.TILE_S;
    const offset = new Point((Const.WIDTH >> 1) - ((5 * ts) >> 1), (Const.WIDTH >> 1) - ((5 * ts) >> 1));
    this.drawRoom(this.room, offset, false);
    this.ctx.drawImage(this.img, Const.PLAYER * ts, 0, ts, ts, offset.x + 2 * ts, offset.y + 2 * ts, ts, ts);
    this.clearRoom(this.room);
  }

  clearRoom(r: Room) {
    r.painted = false;
    for (let n = 0; n < 4; n++) {
      if (r.neighbours[n] && r.neighbours[n].painted)
        this.clearRoom(r.neighbours[n]);
    }
  }

  drawRoom(r: Room, offset: Point, dark: boolean) {
    if (r.painted) return;

    r.painted = true;
    const ts = Const.TILE_S, d = dark ? 1 : 0;

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (y === 0 || x === 0 || y === 4 || x === 4)
          this.ctx.drawImage(this.img, (Const.WALL + d) * ts, 0, ts, ts, offset.x + x * ts, offset.y + y * ts, ts, ts);
        else
          this.ctx.drawImage(this.img, (Const.FLOOR + d) * ts, 0, ts, ts, offset.x + x * ts, offset.y + y * ts, ts, ts);
      }
    }

    if (!dark) {
      for (let s = 0; s < 8; s++) {
        if (r.slots[s]) {
          const sl = r.slots[s]
          this.ctx.drawImage(this.img, (sl.itemType) * ts, 0, ts, ts, offset.x + sl.position.x * ts, offset.y + sl.position.y * ts, ts, ts);
        }
      }
    }

    let a: number, b: number;
    for (let n = 0; n < 4; n++) {
      if (r.neighbours[n]) {
        switch (n) {
          case Const.VN:
            if (r.neighbours[n].visited)
              this.drawRoom(r.neighbours[n], new Point(offset.x, offset.y - (5 * ts)), true);
            a = 2; b = 0;
            break;
          case Const.VE:
            if (r.neighbours[n].visited)
              this.drawRoom(r.neighbours[n], new Point(offset.x + (5 * ts), offset.y), true);
            a = 4; b = 2;
            break;
          case Const.VS:
            if (r.neighbours[n].visited)
              this.drawRoom(r.neighbours[n], new Point(offset.x, offset.y + (5 * ts)), true);
            a = 2; b = 4;
            break;
          case Const.VW:
            if (r.neighbours[n].visited)
              this.drawRoom(r.neighbours[n], new Point(offset.x - (5 * ts), offset.y), true);
            a = 0; b = 2;
            break;
        }
        const io = r.neighbours[n].visited ? (Const.FLOOR + d) : (Const.DOOR + d);
        this.ctx.drawImage(this.img, io * ts, 0, ts, ts, offset.x + a * ts, offset.y + b * ts, ts, ts);
      }
    }
  }
}