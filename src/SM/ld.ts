import { E, lcg, N, NE, NW, PRESSED, S, SE, SW, VE, VN, VNE, VNW, VS, VSE, VSW, VW, W } from "../eng/const.js";
import Keyboard from "../eng/keyboard.js";
import CurrentRoom from "../gme/dungeon/currentRoom.js";
import Dungeon from "../gme/dungeon/dungeon.js";
import Monster from "../gme/entity/monsters/monster.js";
import Player from "../gme/entity/player.js";
import Armor from "../gme/items/armor/armor.js";
import Carcass from "../gme/items/pickups/carcass.js";
import Coin from "../gme/items/pickups/coin.js";
import Container from "../gme/items/pickups/container.js";
import Food from "../gme/items/pickups/food.js";
import Weapon from "../gme/items/weapon/weapon.js";
import FightManager from "../gme/managers/fightManager.js";
import HitManager from "../gme/managers/hitManager.js";
import State from "./state.js";

export default class LilDung extends State {
  dungeon: Dungeon;
  curRoom: CurrentRoom;
  hitManager: HitManager;
  fightManager: FightManager;
  player: Player;
  newLevel: () => void;
  takeAStep: (dir: number) => void;

  constructor(ctx: CanvasRenderingContext2D) {
    super();
    window.addEventListener("Action", (e: CustomEvent) => this.handleAction(e.detail));

    this.draw = () => this.curRoom.draw();
    this.takeAStep = (dir: number) => this.curRoom.updateRoom(dir);
    this.newLevel = () => this.curRoom.setRoom(this.dungeon.create(10, 10));
    this.update = (dt: number) => { };

    this.fightManager = new FightManager();
    this.hitManager = new HitManager();
    this.player = new Player("Player");
    this.dungeon = new Dungeon();
    this.curRoom = new CurrentRoom(ctx);
  }

  handleAction(action: any) {
    this.player.moves++;
    switch (action.action) {
      case "GoDown": this.goDownStairs(); break;
      case "Walk": this.takeAStep(action.arg); break;
      case "Fight": this.fight(<Monster>action.arg); break;
      case "Surprise": this.surprise(action.arg); break;
      case "Eat":
      case "Drink": this.eatOrDrink(action.arg); break;
      case "Coins": this.coins(action.arg); break;
      case "EquipWeapon": this.equipWeapon(action.arg); break;
      case "EquipArmor": this.equipArmor(action.arg); break;
    }
  }

  reset(playername: string) {
    this.player.reset(playername);
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
  }

  goDownStairs() {
    this.player.depth++;
    this.newLevel();
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

  eatOrDrink(item: Food) {
    this.curRoom.clearItem(item.slotIdx);
    this.player.health += item.health;
  }

  coins(item: Coin) {
    this.curRoom.clearItem(item.slotIdx);
    this.player.gold += item.count;
  }

  equipWeapon(item: Weapon) {
    this.curRoom.clearItem(item.slotIdx);
  }

  equipArmor(item: Armor) {
    this.curRoom.clearItem(item.slotIdx);
  }
}