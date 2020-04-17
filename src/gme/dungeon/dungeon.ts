import * as Const from "../../eng/const.js";
import Point from "../../eng/point.js";
import Bat from "../entity/monsters/bat.js";
import Dragon from "../entity/monsters/dragon.js";
import Kobold from "../entity/monsters/kobold.js";
import Oger from "../entity/monsters/oger.js";
import Snake from "../entity/monsters/snake.js";
import Troll from "../entity/monsters/troll.js";
import Yeti from "../entity/monsters/yeti.js";
import Zombie from "../entity/monsters/zombie.js";
import Breastplate from "../items/armor/breastplate.js";
import Chainmail from "../items/armor/chainmail.js";
import Chest from "../items/pickups/chest.js";
import Coin from "../items/pickups/coin.js";
import Food from "../items/pickups/food.js";
import Potion from "../items/pickups/potion.js";
import Knife from "../items/weapon/knife.js";
import Sword from "../items/weapon/sword.js";
import Room from "./room.js";
import Slot from "./slot.js";

export default class Dungeon {
  wid: number;
  hei: number;
  rooms: Room[][];

  constructor() {
    this.wid = 0;
    this.hei = 0;
    this.rooms = [];
  }

  getRoom(p: Point): Room {
    return this.rooms[p.x][p.y];
  }

  create(wid: number, hei: number): Room {
    this.wid = wid;
    this.hei = hei;
    if (this.rooms.length > 0) {
      this.clearRooms();
    }
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
        s.position = Const.SLOTS_POS[q];
        this.rooms[a][b].slots[q] = s;
        break;
      }
    }
    this.rooms[px][py].visited = true;
    return this.rooms[px][py];
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
    const monCount = Const.lcg.rollDice(1, 2),
      pickup = Const.lcg.rollDice(1, 8),
      equip = Const.lcg.rollDice(1, 17);

    let s: number, sl: Slot;
    for (let m = 0; m < monCount; m++) {
      while (true) {
        s = Const.lcg.randNbrI(8);
        if (!r.slots[s]) {
          r.slots[s] = this.createMonster(s);
          break;
        }
      }
    }

    sl = null;
    while (true) {
      s = Const.lcg.randNbrI(8);
      if (!r.slots[s]) {
        switch (pickup) {
          case 2: sl = new Slot(Const.FOOD, new Food(s)); break;
          case 4: sl = new Slot(Const.POTION, new Potion(s)); break;
          case 6: sl = new Slot(Const.COINS, new Coin(s)); break;
          case 8: sl = new Slot(Const.CHEST, new Chest(s)); break;
        }
        break;
      }
    }
    if (sl) {
      r.slots[s] = sl;
      sl.position = Const.SLOTS_POS[s];
      sl.index = s;
    }

    sl = null;
    while (true) {
      s = Const.lcg.randNbrI(8);
      if (!r.slots[s]) {
        switch (equip) {
          case 2: sl = new Slot(Const.KNIFE, new Knife(s)); break;
          case 7: sl = new Slot(Const.CHAINMAIL, new Chainmail(s)); break;
          case 12: sl = new Slot(Const.SWORD, new Sword(s)); break;
          case 17: sl = new Slot(Const.BREASTPLATE, new Breastplate(s)); break;
        }
        break;
      }
    }
    if (sl) {
      r.slots[s] = sl;
      sl.position = Const.SLOTS_POS[s];
      sl.index = s;
    }
  }

  createMonster(s: number): Slot {
    let sl: Slot;
    if (Const.lcg.randPercent() < 5) {
      sl = new Slot(Const.DRAGON, new Dragon(s));
    } else if (Const.lcg.randPercent() < 10) {
      sl = new Slot(Const.OGER, new Oger(s));
    } else if (Const.lcg.randPercent() < 15) {
      sl = new Slot(Const.YETI, new Yeti(s));
    } else if (Const.lcg.randPercent() < 20) {
      sl = new Slot(Const.ZOMBIE, new Zombie(s));
    } else if (Const.lcg.randPercent() < 25) {
      sl = new Slot(Const.TROLL, new Troll(s));
    } else if (Const.lcg.randPercent() < 30) {
      sl = new Slot(Const.KOBOLD, new Kobold(s));
    } else if (Const.lcg.randPercent() < 50) {
      sl = new Slot(Const.SNAKE, new Snake(s));
    } else {
      sl = new Slot(Const.BAT, new Bat(s));
    }
    sl.position = Const.SLOTS_POS[s];
    sl.index = s;
    return sl;
  }

  clearRooms() {
    for (let x = this.wid - 1; x > -1; x--) {
      for (let y = this.hei - 1; y > -1; y--) {
        if (this.rooms[x][y]) {
          delete this.rooms[x][y];
        }
      }
    }
    this.rooms = [];
  }
}