import { NW, N, NE, W, E, SW, S, SE, VN, VW, VE, VS, VNW, VNE, VSW, VSE, DIRECTION, PRESSED } from "../eng/const.js";
import Dungeon from "../gme/dungeon/dungeon.js";
import CurrentRoom from "../gme/dungeon/currentRoom.js";
import HitManager from "../gme/managers/hitManager.js";
import FightManager from "../gme/managers/fightManager.js";
import Player from "../gme/entity/player.js";
import Monster from "../gme/entity/monsters/monster.js";
import Game from "../eng/game.js";
import State from "./state.js";

export default class LilDung extends Game implements State {
  dungeon: Dungeon;
  curRoom: CurrentRoom;
  hitManager: HitManager;
  fightManager: FightManager;
  player: Player;
  newLevel: () => void;

  constructor() {
    super();

    window.addEventListener("Action", (e: CustomEvent) => this.handleAction(e.detail));
    this.draw = () => { this.curRoom.draw(); };
    this.newLevel = () => { this.curRoom.setRoom(this.dungeon.create(10, 10)); }
    this.update = (dt: number) => { };

    this.fightManager = new FightManager();
    this.player = new Player();
    this.hitManager = new HitManager();
    this.dungeon = new Dungeon();

    this.curRoom = new CurrentRoom(this.ctx, () => {
      this.newLevel();
      this.loop();
    });
  }

  start() {
    this.keyboard.addKey(NW, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VNW), VNW); });
    this.keyboard.addKey(N, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VN), VN); });
    this.keyboard.addKey(NE, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VNE), VNE); });
    this.keyboard.addKey(W, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VW), VW); });
    this.keyboard.addKey(E, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VE), VE); });
    this.keyboard.addKey(SW, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VSW), VSW); });
    this.keyboard.addKey(S, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VS), VS); });
    this.keyboard.addKey(SE, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VSE), VSE); });
  }

  handleAction(action: any) {
    switch (action.action) {
      case "GoDown":
        this.newLevel();
        break;
      case "Walk":
        this.curRoom.updateRoom(action.arg)
        break;
      case "Fight":
        if (this.fightManager.fight(this.player, action.arg))
          this.curRoom.clearSlot((<Monster>action.arg).slot);
        break;
    }
  }

  terminate() {
    this.keyboard.clear();
    this.keyboard = null;
    document.getElementById("mainCanvas").remove();
  }
}