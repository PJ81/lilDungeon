import * as Const from "../../eng/const.js";
import Room from "./room.js";
import Point from "../../eng/point.js";
import Slot from "./slot.js";
import Kobold from "../entity/monsters/kobold.js";

export default class Dungeon {
  wid: number;
  hei: number;
  depth: number;
  rooms: Room[][];

  constructor() {
    this.wid = 0;
    this.hei = 0;
    this.depth = 0;
    this.rooms = [];
  }

  getStartPositon(): Point {
    return new Point(this.wid >> 1, this.hei >> 1);
  }

  getRoom(p: Point): Room {
    return this.rooms[p.x][p.y];
  }

  create(wid: number, hei: number, depth: number) {
    this.wid = wid;
    this.hei = hei;
    this.depth = depth;
    this.rooms = [];

    for (let x = 0; x < this.wid; x++) {
      this.rooms.push([]);
      for (let y = 0; y < this.hei; y++) {
        this.rooms[x].push(null);
      }
    }

    let r = new Room();
    const px = this.wid >> 1, py = this.hei >> 1;
    r.pos.set(px, py);
    this.rooms[px][py] = r;

    const tmpRooms: Array<Room> = [];
    tmpRooms.push(r);

    while (tmpRooms.length) {
      r = tmpRooms.splice(0, 1)[0];
      this.addDoors(r, tmpRooms);
    }

    while (true) {
      const a = Const.lcg.randNbrI(this.wid), b = Const.lcg.randNbrI(this.hei);
      if (this.rooms[a][b] && this.rooms[px][py].pos.distSqr(this.rooms[a][b].pos) > 22) {
        const r = this.rooms[a][b];
        for (let s = 0; s < 8; s++) {
          r.slots[s] = null;
        }
        const q = [Const.VSE, Const.VSW, Const.VNE, Const.VNW][Const.lcg.randNbrI(4)];
        const s = new Slot(Const.STAIRS, null);
        s.pos = Const.SLOTS_POS[q];
        this.rooms[px][py].slots[q] = s;
        break;
      }
    }
  }

  addRoom(r: Room, x: number, y: number, da: number, db: number, tr: Room[]) {
    const s = new Room();
    s.pos.set(x, y);
    r.neighbours[da] = s;
    s.neighbours[db] = r;
    this.rooms[x][y] = s;
    tr.push(s);
    this.seedSlots(s);
  }

  addDoors(r: Room, tr: Room[]) {
    let d = 0, count = 0, s: Room;
    while (d < 1 && count < 1250) {
      if (Const.lcg.randPercent() < 25 && !r.neighbours[Const.VN] && r.pos.y - 1 >= 0 && !this.rooms[r.pos.x][r.pos.y - 1]) {
        this.addRoom(r, r.pos.x, r.pos.y - 1, Const.VN, Const.VS, tr);
        d++;
      }
      if (Const.lcg.randPercent() < 25 && !r.neighbours[Const.VE] && r.pos.x + 1 < this.wid && !this.rooms[r.pos.x + 1][r.pos.y]) {
        this.addRoom(r, r.pos.x + 1, r.pos.y, Const.VE, Const.VW, tr);
        d++;
      }
      if (Const.lcg.randPercent() < 25 && !r.neighbours[Const.VS] && r.pos.y + 1 < this.hei && !this.rooms[r.pos.x][r.pos.y + 1]) {
        this.addRoom(r, r.pos.x, r.pos.y + 1, Const.VS, Const.VN, tr);
        d++;
      }
      if (Const.lcg.randPercent() < 25 && !r.neighbours[Const.VW] && r.pos.x - 1 >= 0 && !this.rooms[r.pos.x - 1][r.pos.y]) {
        this.addRoom(r, r.pos.x - 1, r.pos.y, Const.VW, Const.VE, tr);
        d++;
      }
      count++;
    }
  }

  seedSlots(r: Room) {
    for (let s = 0; s < 8; s++) {
      if (Const.lcg.randPercent() < 15) {
        const sl = new Slot(Const.KOBOLD, new Kobold(s));
        sl.pos = Const.SLOTS_POS[s];
        r.slots[s] = sl;
      }
    }
  }
}