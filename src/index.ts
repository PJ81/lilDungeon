import { NW, N, NE, W, E, SW, S, SE, VN, VW, VE, VS, VNW, VNE, VSW, VSE, DIRECTION } from "./eng/const.js";
import Game from "./eng/game.js";
import HitManager from "./gme/managers/hitManager.js";
import Dungeon from "./gme/dungeon/dungeon.js";
import Renderer from "./gme/dungeon/renderer.js";
import Room from "./gme/dungeon/room.js";
import Player from "./gme/entity/player.js";
import FightManager from "./gme/managers/fightManager.js";
import Monster from "./gme/entity/monsters/monster.js";

export default class LilDung extends Game {
  dungeon: Dungeon;
  curRoom: Room;
  renderer: Renderer;
  hitManager: HitManager;
  fightManager: FightManager;
  player: Player;

  constructor() {
    super();
    this.fightManager = new FightManager();
    window.addEventListener("Action", (e: CustomEvent) => this.handleAction(e.detail));
    this.update = (dt: number) => { };
    this.player = new Player();
    this.hitManager = new HitManager();
    this.dungeon = new Dungeon();
    this.renderer = new Renderer(this.ctx, () => {
      window.addEventListener("keydown", (e) => { this.keyHandle(e.keyCode) }, false);
      this.newLevel();
      this.loop();
    });
  }

  keyHandle(e: number) {
    switch (e) {
      case NW: this.hitManager.hit(this.curRoom, VNW); break;
      case N: this.hitManager.hit(this.curRoom, VN); break;
      case NE: this.hitManager.hit(this.curRoom, VNE); break;
      case W: this.hitManager.hit(this.curRoom, VW); break;
      case E: this.hitManager.hit(this.curRoom, VE); break;
      case SW: this.hitManager.hit(this.curRoom, VSW); break;
      case S: this.hitManager.hit(this.curRoom, VS); break;
      case SE: this.hitManager.hit(this.curRoom, VSE); break;
    }
  }

  updateCurrentRoom() {
    this.curRoom = this.dungeon.getRoom(this.player.currentPos);
    this.curRoom.visited = true;
  }

  newLevel() {
    this.dungeon.create(10, 10, 11);
    this.player.currentPos = this.dungeon.getStartPositon();
    this.updateCurrentRoom();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderer.draw(this.curRoom, false);
  }

  fight(monster: Monster) {
    const hit = this.fightManager.attack(this.player, monster);
    this.player.weapon.getDamage(hit >> 1);
    monster.armor.getDamage(hit >> 1);
    if (monster.health > 0) {
      this.fightManager.attack(monster, this.player);
      this.player.armor.getDamage(hit >> 1);
      monster.weapon.getDamage(hit >> 1);
      if (this.player.health <= 0) {
        console.log('GO');

        window.dispatchEvent(new CustomEvent("GameOver", {
          detail: {}
        }));
      }
    } else {
      this.player.xperience += monster.xperience;
      this.player.pointsToNextLevel -= monster.xperience;
      if (this.player.pointsToNextLevel <= 0) {
        this.player.level++;
        this.player.pointsToNextLevel += this.player.level * 5;
        this.player.healthO += 2;
        this.player.health++;
      }
      this.curRoom.slots[monster.slot] = null;
    }
  }

  handleAction(action: any) {
    switch (action.action) {
      case "GoDown":
        this.newLevel();
        break;
      case "Walk":
        if (this.curRoom.neighbours[action.arg]) {
          this.player.currentPos.add(DIRECTION[action.arg]);
          this.updateCurrentRoom();
        }
        break;
      case "Fight":
        this.fight(action.arg)
        break;
    }
  }
}

new LilDung();
