import * as Const from "../../eng/const.js";
import Point from "../../eng/point.js";
import Resources from "../../eng/resources.js";
import Monster from "../entity/monsters/monster.js";
import Item from "../items/item.js";
import { startEvent } from "../tools/startMsg.js";
import Room from "./room.js";

export default class CurrentRoom {
  room: Room;
  ctx: CanvasRenderingContext2D;
  res: Resources;
  img: HTMLImageElement;

  clearItem: (i: number) => void;
  getItem: (i: number) => Item;
  setItem: (i: number, item: Item) => void;
  getRoom: () => Room;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.res = new Resources();

    this.clearItem = (i: number) => this.room.items[i] = null;
    this.setItem = (i: number, item: Item) => this.room.items[i] = item;
    this.getItem = (i: number): Item => { return this.room.items[i]; }
    this.getRoom = (): Room => { return this.room; }

    this.res.loadImages(["tiles.png"], () => {
      this.img = this.res.images[0];
      () => { };
    });
  }

  updateRoom(i: number, playerHasKey: boolean) {
    const r = this.room.neighbours[i];
    if (!r) return;
    if (r.locked && !playerHasKey) {
      startEvent("Message", `This door is locked`);
    } else {
      r.lock(false);
      this.setRoom(r);
    }
  }

  update(dt: number) {
    this.room.items.forEach(itm => {
      if (itm instanceof Monster) {
        itm.update(dt);
      }
    });
  }

  setRoom(r: Room) {
    if (!r) return;
    this.room = r;
    this.room.visited = true;
  }

  draw(t: number) {
    const ts = Const.TILE_S;
    const offset = new Point((Const.WIDTH >> 1) - ((5 * ts) >> 1), (Const.WIDTH >> 1) - ((5 * ts) >> 1));
    this.drawRoom(this.room, offset, false);
    const pl = t > 0 ? Const.PLAYER + Const.MON_COUNT + 1 : Const.PLAYER;
    this.ctx.drawImage(this.img, pl * ts, 0, ts, ts, offset.x + 2 * ts, offset.y + 2 * ts, ts, ts);
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
        const itm = r.items[s];
        if (itm) {
          //if(itm.type === Const.STAIRS && )
          const x = Const.SLOTS_POS[itm.slotIdx].x,
            y = Const.SLOTS_POS[itm.slotIdx].y,
            ty = itm instanceof Monster ? itm.demTime > 0 ? itm.type + Const.MON_COUNT + 1 : itm.type : itm.type;
          this.ctx.drawImage(this.img, ty * ts, 0, ts, ts, offset.x + x * ts, offset.y + y * ts, ts, ts);
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