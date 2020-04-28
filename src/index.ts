import { MENU } from "./eng/const.js";
import Game from "./eng/game.js";
import GameOver from "./gme/sm/gameOver.js";
import LilDung from "./gme/sm/ld.js";
import Menu from "./gme/sm/menu.js";
import Sanctuary from "./gme/sm/santuary.js";
import State from "./gme/sm/state.js";

//https://nethackwiki.com/wiki/Rogue_(game)

class MyGame extends Game {
  curState: State;
  game: State;
  over: State;
  menu: State;
  sanc: Sanctuary;
  startFunc: Function[];

  constructor() {
    super();
    this.game = new LilDung(this.ctx);
    this.menu = new Menu();
    this.over = new GameOver();
    this.sanc = new Sanctuary();
    this.curState = null;

    this.startFunc = [this.startPlay.bind(this), this.startMenu.bind(this), this.startOver.bind(this), this.startSanc.bind(this)];

    this.update = (dt: number) => this.curState.update(dt);
    this.draw = () => this.curState.draw(this.ctx);

    window.addEventListener("StateChange", (e: CustomEvent) => {
      this.keyboard.clear();
      this.startFunc[e.detail.state](e);
    });
  }

  startPlay(e: CustomEvent) {
    this.curState = this.game;
    this.curState.start(this.keyboard, e.detail.playerName);
  }

  startMenu(e: CustomEvent) {
    this.curState = this.menu;
    this.curState.start(this.keyboard);
  }

  startOver(e: CustomEvent) {
    this.curState = this.over;
    this.curState.start(this.keyboard, e.detail.player, e.detail.killer);
  }

  startSanc(e: CustomEvent) {
    this.curState = this.sanc;
    this.curState.start(this.keyboard, e.detail.player);
  }
}

const g = new MyGame();
window.dispatchEvent(new CustomEvent("StateChange", {
  detail: {
    state: MENU
  }
}));

while (!g.curState) { }
g.loop();