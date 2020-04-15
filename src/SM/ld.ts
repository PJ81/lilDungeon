import { NW, N, NE, W, E, SW, S, SE, VN, VW, VE, VS, VNW, VNE, VSW, VSE, DIRECTION, PRESSED } from "../eng/const.js";
import Dungeon from "../gme/dungeon/dungeon.js";
import CurrentRoom from "../gme/dungeon/currentRoom.js";
import HitManager from "../gme/managers/hitManager.js";
import FightManager from "../gme/managers/fightManager.js";
import Player from "../gme/entity/player.js";
import Monster from "../gme/entity/monsters/monster.js";
import State from "./state.js";
import Keyboard from "../eng/keyboard.js";

export default class LilDung extends State {
  dungeon: Dungeon;
  curRoom: CurrentRoom;
  hitManager: HitManager;
  fightManager: FightManager;
  player: Player;
  newLevel: () => void;

  constructor(ctx: CanvasRenderingContext2D) {
    super();

    window.addEventListener("Action", (e: CustomEvent) => this.handleAction(e.detail));
    this.draw = () => { this.curRoom.draw(); };
    this.newLevel = () => { this.curRoom.setRoom(this.dungeon.create(10, 10)); }
    this.update = (dt: number) => { };
    this.fightManager = new FightManager();
    this.hitManager = new HitManager();
    this.player = new Player("Player");
    this.dungeon = new Dungeon();
    this.curRoom = new CurrentRoom(ctx);//, () => {this.newLevel();});
  }

  reset(playername: string) {
    this.player.name = playername;
    this.player.reset();
    this.newLevel();
  }

  start(keyboard: Keyboard, playername: string) {
    this.reset(playername);
    keyboard.addKey(NW, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VNW), VNW); });
    keyboard.addKey(N, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VN), VN); });
    keyboard.addKey(NE, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VNE), VNE); });
    keyboard.addKey(W, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VW), VW); });
    keyboard.addKey(E, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VE), VE); });
    keyboard.addKey(SW, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VSW), VSW); });
    keyboard.addKey(S, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VS), VS); });
    keyboard.addKey(SE, (st: number) => { if (st === PRESSED) this.hitManager.hit(this.curRoom.getSlot(VSE), VSE); });
  }

  handleAction(action: any) {
    switch (action.action) {
      case "GoDown":
        this.player.moves++;
        this.player.depth++;
        this.newLevel();
        break;
      case "Walk":
        this.curRoom.updateRoom(action.arg);
        this.player.moves++;
        break;
      case "Fight":
        this.player.moves++;
        if (this.fightManager.fight(this.player, action.arg))
          this.curRoom.clearSlot((<Monster>action.arg).slot);
        break;
    }
  }
}