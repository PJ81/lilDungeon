import { GMOR, MENU, PLAY, SANC } from "./eng/const.js";
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

  constructor() {
    super();
    this.game = new LilDung(this.ctx);
    this.menu = new Menu();
    this.over = new GameOver();
    this.sanc = new Sanctuary();

    window.addEventListener("StateChange", (e: CustomEvent) => {
      this.keyboard.clear();
      switch (e.detail.state) {
        case PLAY:
          this.curState = this.game;
          this.curState.start(this.keyboard, (<Menu>this.menu).playername)
          break;
        case MENU:
          this.curState = this.menu;
          this.curState.start(this.keyboard);
          break;
        case GMOR:
          this.curState = this.over;
          this.curState.start(this.keyboard, e.detail.player, e.detail.killer);
          break;
        case SANC:
          this.curState = this.sanc;
          this.curState.start(this.keyboard, e.detail.player);
          break;
      }
    });
  }

  update(dt: number) {
    this.curState.update(dt);
  }

  draw() {
    this.curState.draw(this.ctx);
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