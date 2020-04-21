import * as Const from "../../eng/const.js";
import Point from "../../eng/point.js";
import Bat from "../entity/monsters/bat.js";
import Dragon from "../entity/monsters/dragon.js";
import Kobold from "../entity/monsters/kobold.js";
import Monster from "../entity/monsters/monster.js";
import Oger from "../entity/monsters/oger.js";
import Snake from "../entity/monsters/snake.js";
import Spider from "../entity/monsters/spider.js";
import Troll from "../entity/monsters/troll.js";
import Vampire from "../entity/monsters/vampire.js";
import Yeti from "../entity/monsters/yeti.js";
import Zombie from "../entity/monsters/zombie.js";
import Chainmail from "../items/armor/chainmail.js";
import Leather from "../items/armor/leather.js";
import Item from "../items/item.js";
import Chest from "../items/pickups/chest.js";
import Coin from "../items/pickups/coin.js";
import Food from "../items/pickups/food.js";
import Potion from "../items/pickups/potion.js";
import Knife from "../items/weapon/dagger.js";
import Sword from "../items/weapon/sword.js";
import Room from "./room.js";

export default class Dungeon {
  wid: number;
  hei: number;
  lvl: number;
  rooms: Room[][];
  getRoom: (p: Point) => Room;
  getDistance: (a: number, b: number, c: number, d: number) => number;

  constructor() {
    this.wid = this.hei = this.lvl = 0;
    this.rooms = [];
    this.getRoom = (p: Point): Room => { return this.rooms[p.x][p.y]; }
    this.getDistance = (a: number, b: number, c: number, d: number): number => { return this.rooms[a][b].position.distSqr(this.rooms[c][d].position) };
  }

  create(wid: number, hei: number, lvl: number): Room {
    this.wid = wid;
    this.hei = hei;
    this.lvl = lvl;
    const startPos = new Point(this.wid >> 1, this.hei >> 1);

    if (Const.SANCTUARY === this.lvl) {
      this.createSanctuary();
      return;
    }

    while (true) {
      if (this.rooms.length > 0) this.clearRooms();

      for (let x = 0; x < this.wid; x++) {
        this.rooms.push([]);
        for (let y = 0; y < this.hei; y++) {
          this.rooms[x].push(null);
        }
      }

      let r = new Room();
      r.position = startPos;
      this.rooms[startPos.x][startPos.y] = r;

      const tmpRooms: Array<Room> = [];
      tmpRooms.push(r);

      while (tmpRooms.length) {
        r = tmpRooms.splice(0, 1)[0];
        this.addDoors(r, tmpRooms);
      }

      while (true) {
        const a = Const.lcg.randNbrI(this.wid), b = Const.lcg.randNbrI(this.hei);
        if (this.rooms[a][b] && this.getDistance(startPos.x, startPos.y, a, b) > 22) {
          const r = this.rooms[a][b];
          r.clearItems();
          const q = [Const.VSE, Const.VSW, Const.VNE, Const.VNW][Const.lcg.randNbrI(4)];
          this.rooms[a][b].items[q] = new Item("Stairs", Const.STAIRS, q);
          this.rooms[a][b].hasStairs = true;
          break;
        }
      }

      if ((this.lvl & 1) === 1 && this.lvl > 1) {
        if (this.setKeyAndSacredItem(startPos)) break;
      } else break;
    }
    this.rooms[startPos.x][startPos.y].visited = true;
    return this.rooms[startPos.x][startPos.y];
  }

  addRoom(r: Room, x: number, y: number, da: number, db: number): Room {
    const s = new Room();
    s.position.set(x, y);
    r.neighbours[da] = s;
    s.neighbours[db] = r;
    this.rooms[x][y] = s;
    this.seedSlots(s);
    return s;
  }

  addDoors(r: Room, tr: Room[]) {
    let d = 0, count = 0, s: Room;
    while (d < 1 && count < 1250) {
      if (Const.lcg.randPercent() < 25 && !r.neighbours[Const.VN] && r.position.y - 1 >= 0 && !this.rooms[r.position.x][r.position.y - 1]) {
        tr.push(this.addRoom(r, r.position.x, r.position.y - 1, Const.VN, Const.VS));
        d++;
      }
      if (Const.lcg.randPercent() < 25 && !r.neighbours[Const.VE] && r.position.x + 1 < this.wid && !this.rooms[r.position.x + 1][r.position.y]) {
        tr.push(this.addRoom(r, r.position.x + 1, r.position.y, Const.VE, Const.VW));
        d++;
      }
      if (Const.lcg.randPercent() < 25 && !r.neighbours[Const.VS] && r.position.y + 1 < this.hei && !this.rooms[r.position.x][r.position.y + 1]) {
        tr.push(this.addRoom(r, r.position.x, r.position.y + 1, Const.VS, Const.VN));
        d++;
      }
      if (Const.lcg.randPercent() < 25 && !r.neighbours[Const.VW] && r.position.x - 1 >= 0 && !this.rooms[r.position.x - 1][r.position.y]) {
        tr.push(this.addRoom(r, r.position.x - 1, r.position.y, Const.VW, Const.VE));
        d++;
      }
      count++;
    }
  }

  seedSlots(r: Room) {
    const monCount = Const.lcg.rollDice(1, 2),
      pickup = Const.lcg.rollDice(1, 8),
      equip = Const.lcg.rollDice(1, 17);

    let s: number, itm: Item;
    for (let m = 0; m < monCount; m++) {
      while (true) {
        s = Const.lcg.randNbrI(8);
        if (!r.items[s]) {
          r.items[s] = this.createMonster(s);
          break;
        }
      }
    }

    itm = null;
    while (true) {
      s = Const.lcg.randNbrI(8);
      if (!r.items[s]) {
        switch (pickup) {
          case 2: itm = new Food(s); break;
          case 4: itm = new Potion(s); break;
          case 6: itm = new Coin(s); break;
          case 8: itm = new Chest(s); break;
        }
        break;
      }
    }
    if (itm) r.items[s] = itm;

    itm = null;
    while (true) {
      s = Const.lcg.randNbrI(8);
      if (!r.items[s]) {
        switch (equip) {
          case 2: itm = new Knife(s); break;
          case 7: itm = new Chainmail(s); break;
          case 12: itm = new Sword(s); break;
          case 17: itm = new Leather(s); break;
        }
        break;
      }
    }
    if (itm) r.items[s] = itm;
  }

  createMonster(s: number): Monster {
    let mon: Monster;
    if (Const.lcg.randPercent() < 5) mon = new Dragon(s);
    else if (Const.lcg.randPercent() < 10) mon = new Oger(s);
    else if (Const.lcg.randPercent() < 15) mon = new Yeti(s);
    else if (Const.lcg.randPercent() < 20) mon = new Zombie(s);
    else if (Const.lcg.randPercent() < 25) mon = new Troll(s);
    else if (Const.lcg.randPercent() < 30) mon = new Kobold(s);
    else if (Const.lcg.randPercent() < 40) mon = new Vampire(s);
    else if (Const.lcg.randPercent() < 50) mon = new Snake(s);
    else if (Const.lcg.randPercent() < 60) mon = new Bat(s);
    else mon = new Spider(s);
    return mon;
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

  setKeyAndSacredItem(startPos: Point): boolean {
    const oneDoor: Array<Room> = [];
    this.rooms.forEach(c => {
      c.forEach(r => {
        if (r && !r.hasStairs && r.getNeighboursCount() === 1)
          oneDoor.push(r);
      });
    });

    if (oneDoor.length < 1) return false;

    let md = 0, d: number, t: Room;
    oneDoor.forEach(r => {
      d = this.getDistance(startPos.x, startPos.y, r.position.x, r.position.y);
      if (d > md) { md = d; t = r }
    });

    const s = Const.lcg.randNbrI(8), itm = Const.SACRED[this.lvl - 3];
    t.clearItems();
    t.items[s] = new Item(<string>itm[0], <number>itm[1], s);
    t.lock(true);

    let u = null;
    this.rooms.forEach(c => {
      c.forEach(r => {
        if (r && !r.locked && !r.hasStairs && !r.position.equals(startPos)) {
          d = this.getDistance(t.position.x, t.position.x, r.position.x, r.position.y);
          if (d > md) { md = d; u = r }
        }
      });
    });

    if (u) {
      let s: number;
      while (true) {
        s = Const.lcg.randNbrI(8);
        if (!u.items[s]) break;
      }
      u.items[s] = new Item("Key", Const.KEY, s);
    }

    return true;
  }

  createSanctuary() {
    //
  }
}