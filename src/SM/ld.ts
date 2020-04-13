import { NW, N, NE, W, E, SW, S, SE, VN, VW, VE, VS, VNW, VNE, VSW, VSE, GMOR, DIRECTION, PRESSED } from "../eng/const.js";
import Dungeon from "../gme/dungeon/dungeon.js";
import Room from "../gme/dungeon/room.js";
import Renderer from "../gme/dungeon/renderer.js";
import HitManager from "../gme/managers/hitManager.js";
import FightManager from "../gme/managers/fightManager.js";
import Player from "../gme/entity/player.js";
import Monster from "../gme/entity/monsters/monster.js";
import Game from "../eng/game.js";
import State from "./state.js";

export default class LilDung extends Game implements State {
  dungeon: Dungeon;
  curRoom: Room;
  renderer: Renderer;
  hitManager: HitManager;
  fightManager: FightManager;
  player: Player;

  constructor() {
    super();
    window.addEventListener("Action", (e: CustomEvent) => this.handleAction(e.detail));
    this.fightManager = new FightManager();
    this.player = new Player();
    this.hitManager = new HitManager();
    this.dungeon = new Dungeon();
    this.renderer = new Renderer(this.ctx, () => {
      this.newLevel();
      this.loop();
    });
  }

  update(dt: number) { }

  start() {
    this.keyboard.addKey(NW, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom, VNW); });
    this.keyboard.addKey(N, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom, VN); });
    this.keyboard.addKey(NE, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom, VNE); });
    this.keyboard.addKey(W, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom, VW); });
    this.keyboard.addKey(E, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom, VE); });
    this.keyboard.addKey(SW, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom, VSW); });
    this.keyboard.addKey(S, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom, VS); });
    this.keyboard.addKey(SE, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom, VSE); });
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
    this.renderer.draw(this.curRoom, false);
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
        if (this.fightManager.fight(this.player, action.arg))
          this.curRoom.slots[(<Monster>action.arg).slot] = null;
        break;
    }
  }

  terminate() {
    this.keyboard.clear();
    this.keyboard = null;
    document.getElementById("mainCanvas").remove();
  }
}