import State from "./state.js";
import Game from "../eng/game.js";
import { PLAY } from "../eng/const.js";

export default class Menu extends Game implements State {
  constructor() {
    super();
  }

  start() {
    this.keyboard.addKey(32, () => {
      window.dispatchEvent(new CustomEvent("StateChange", {
        detail: {
          state: PLAY
        }
      }));
    });
    this.loop();
  }

  update(dt: number) {
    //
  }

  draw() {
    const m = this.canvas.width >> 1;
    this.ctx.font = "30px Roboto Mono";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "center";
    this.ctx.fillText("MENU", m, 60);
    this.ctx.font = "12px Roboto Mono";
    this.ctx.fillText("PRESS [SPACE] TO PLAY", m, this.canvas.height * .95);
  }

  terminate() {
    this.keyboard.clear();
    this.keyboard = null;
    document.getElementById("mainCanvas").remove();
  }
}