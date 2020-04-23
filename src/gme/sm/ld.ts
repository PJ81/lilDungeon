import { E, lcg, N, NE, NW, ORDINALS, PRESSED, S, SANC, SANCTUARY, SE, SW, VE, VN, VNE, VNW, VS, VSE, VSW, VW, W } from "../../eng/const.js";
import Keyboard from "../../eng/keyboard.js";
import CurrentRoom from "../dungeon/currentRoom.js";
import Dungeon from "../dungeon/dungeon.js";
import Monster from "../entity/monsters/monster.js";
import Player from "../entity/player.js";
import Armor from "../items/armor/armor.js";
import Item from "../items/item.js";
import Carcass from "../items/pickups/carcass.js";
import Coin from "../items/pickups/coin.js";
import Container from "../items/pickups/container.js";
import Edible from "../items/pickups/edible.js";
import Trap from "../items/pickups/trap.js";
import Weapon from "../items/weapon/weapon.js";
import FightManager from "../managers/fightManager.js";
import HitManager from "../managers/hitManager.js";
import { startEvent } from "../tools/startMsg.js";
import State from "./state.js";

export default class LilDung extends State {
  dungeon: Dungeon;
  curRoom: CurrentRoom;
  hitManager: HitManager;
  fightManager: FightManager;
  player: Player;
  statsDiv: HTMLDivElement;
  messages: string[];
  newLevel: () => void;
  takeAStep: (dir: number) => void;

  constructor(ctx: CanvasRenderingContext2D) {
    super();
    window.addEventListener("Action", (e: CustomEvent) => this.handleAction(e.detail));
    window.addEventListener("Message", (e: CustomEvent) => this.outputMsg(e.detail));
    this.statsDiv = <HTMLDivElement>document.getElementById("stats");
    this.takeAStep = (dir: number) => this.curRoom.updateRoom(dir, this.player.hasKey);
    this.newLevel = () => this.curRoom.setRoom(this.dungeon.create(10, 10, this.player.depth));

    this.fightManager = new FightManager();
    this.hitManager = new HitManager();
    this.player = new Player("Player");
    this.dungeon = new Dungeon();
    this.curRoom = new CurrentRoom(ctx);
    this.messages = [];
  }

  handleAction(action: any) {
    this.player.moves++;
    switch (action.arg1) {
      case "GoDown": this.goDownStairs(); break;
      case "Walk": this.takeAStep(action.arg2); break;
      case "Fight": this.fight(<Monster>action.arg2); break;
      case "Surprise": this.surprise(action.arg2); break;
      case "Eat":
      case "Drink": this.eatOrDrink(action.arg2); break;
      case "Coins": this.coins(action.arg2); break;
      case "EquipWeapon": this.equipWeapon(action.arg2); break;
      case "EquipArmor": this.equipArmor(action.arg2); break;
      case "Trap": this.trap(action.arg2); break;
      case "Key": this.key(action.arg2); break;
      case "Sacred": this.sacred(action.arg2); break;
    }
    this.showStats();
  }

  draw() {
    const mc = this.dungeon.countMonsters();
    this.curRoom.draw(this.player.demTime);
  }

  update(dt: number) {
    this.player.update(dt);
    this.curRoom.update(dt);
  }

  outputMsg(msg: any) {
    if (this.messages.length > 7) {
      this.messages.splice(0, 1);
    }
    this.messages.push(msg.arg1);

    let l = 0;
    for (let z = this.messages.length - 1; z > -1; z--) {
      const d = <HTMLDivElement>document.getElementById(`msg${l}`);
      d.innerText = this.messages[z];
      l++;
    }
  }

  reset(playername: string) {
    this.player.reset(playername);
    this.messages = [];
    this.newLevel();
  }

  start(keyboard: Keyboard, playername: string) {
    this.reset(playername);
    keyboard.addKey(NW, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getItem(VNW), VNW); });
    keyboard.addKey(N, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getItem(VN), VN); });
    keyboard.addKey(NE, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getItem(VNE), VNE); });
    keyboard.addKey(W, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getItem(VW), VW); });
    keyboard.addKey(E, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getItem(VE), VE); });
    keyboard.addKey(SW, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getItem(VSW), VSW); });
    keyboard.addKey(S, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getItem(VS), VS); });
    keyboard.addKey(SE, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getItem(VSE), VSE); });
    this.showStats();
  }

  goDownStairs() {
    this.player.depth++;
    this.player.hasKey = false;

    if (SANCTUARY === this.player.depth) {
      window.dispatchEvent(new CustomEvent("StateChange", {
        detail: {
          state: SANC,
          player: this.player
        }
      }));
    } else {
      startEvent("Message", `Welcome to level ${this.player.depth}`);//, ${this.player.name}!
      this.newLevel();
    }
  }

  fight(monster: Monster) {
    if (this.fightManager.fight(this.player, monster)) {
      if (!this.dropItem(monster)) {
        this.curRoom.clearItem(monster.slotIdx);
      }
    }
  }

  dropItem(monster: Monster): boolean {
    const o = this.curRoom.getItem(monster.slotIdx);
    if (lcg.rollDice(1, 100) < 35) {
      const itm = new Carcass(monster.slotIdx);
      this.curRoom.setItem(monster.slotIdx, itm);
      return true;
    }
    if (lcg.rollDice(1, 100) < 45) {
      this.curRoom.setItem(monster.slotIdx, monster.item);
      return true;
    }
    return false;
  }

  surprise(item: Container) {
    this.curRoom.setItem(item.slotIdx, item.item);
  }

  eatOrDrink(item: Edible) {
    this.curRoom.clearItem(item.slotIdx);
    this.player.health += item.health;
    if (this.player.health > this.player.healthMax) {
      this.player.health = this.player.healthMax;
    }
    startEvent("Message", `You receive some energie from this ${item.name}`);
  }

  coins(item: Coin) {
    this.curRoom.clearItem(item.slotIdx);
    this.player.gold += item.count;
    startEvent("Message", `You found ${item.count} coins`);
  }

  equipWeapon(weapon: Weapon) {
    this.curRoom.clearItem(weapon.slotIdx);
    this.player.equip(weapon);
    startEvent("Message", `You're armed with a ${weapon.name}`);
  }

  equipArmor(armor: Armor) {
    this.curRoom.clearItem(armor.slotIdx);
    this.player.equip(armor);
    startEvent("Message", `You're using a ${armor.name}`);
  }

  trap(trap: Trap) {
    this.player.takeDamage(trap.damage, trap);
    this.curRoom.clearItem(trap.slotIdx);
    startEvent("Message", `You step on a trap for a damage of ${trap.damage}`);
  }

  key(key: Item) {
    this.player.hasKey = true;
    this.curRoom.clearItem(key.slotIdx);
    startEvent("Message", `You found a key`);
  }

  sacred(item: Item) {
    this.player.sacredItems.push(item);
    this.curRoom.clearItem(item.slotIdx);
    startEvent("Message", `You found your ${ORDINALS[this.player.sacredItems.length - 1]} sacred item: ${item.name}`);
  }

  showStats() {
    const s = `Level: ${this.player.level}  Health: ${this.player.health}(${this.player.healthMax})  ` +
      `Attack: ${this.player.attack + this.player.weapon.attack}(${this.player.attackMax + this.player.weapon.attackMax})  ` +
      `Def: ${this.player.defense + this.player.armor.defense}(${this.player.defenseMax + this.player.armor.defenseMax})  ` +
      `Gold: ${this.player.gold}  Exp: ${this.player.experience}(${this.player.experience + this.player.pointsToNextLevel})`;
    this.statsDiv.innerText = s;
  }
}