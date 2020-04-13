import { PLAY, MENU, GMOR } from "./eng/const.js"
import State from "./SM/state.js";
import GameOver from "./SM/gameOver.js";
import Menu from "./SM/menu.js";
import LilDung from "./SM/ld.js";

class MyGame {
  curState: State;

  constructor() {
    window.addEventListener("StateChange", (e: CustomEvent) => {
      if (this.curState)
        this.curState.terminate();
      switch (e.detail.state) {
        case PLAY:
          this.curState = new LilDung();
          break;
        case MENU:
          this.curState = new Menu();
          break;
        case GMOR:
          this.curState = new GameOver();
          break;
      }
      this.curState.start();
    });
  }
}

new MyGame();
window.dispatchEvent(new CustomEvent("StateChange", {
  detail: {
    state: MENU
  }
}));