import { PLAY, MENU, GMOR } from "./eng/const.js"
import State from "./SM/state.js";
import GameOver from "./SM/gameOver.js";
import Menu from "./SM/menu.js";
import LilDung from "./SM/ld.js";
import Game from "./eng/game.js";

class MyGame extends Game {
  curState: State;
  game: State;
  over: State;
  menu: State;

  constructor() {
    super();
    this.game = new LilDung(this.ctx);
    this.menu = new Menu();
    this.over = new GameOver();

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
          this.curState.start(this.keyboard, e.detail.player, e.detail.monster);
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