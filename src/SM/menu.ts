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
    this.ctx.font = "60px VT323";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "center";
    this.ctx.fillText("MENU", this.canvas.width >> 1, 100);
    this.ctx.font = "24px VT323";
    this.ctx.fillText("PRESS [SPACE] TO PLAY", this.canvas.width >> 1, this.canvas.height * .9);
  }

  terminate() {
    this.keyboard.clear();
    this.keyboard = null;
    document.getElementById("mainCanvas").remove();
  }
}