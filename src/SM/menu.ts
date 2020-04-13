import State from "./state.js";
import Game from "../eng/game.js";
import { PLAY } from "../eng/const.js";

export default class Menu extends Game implements State {
  constructor() {
    super();
  }

  start() {
    window.addEventListener("keydown", () => {
      window.dispatchEvent(new CustomEvent("StateChange", {
        detail: {
          state: PLAY
        }
      }));
    }, false);
    this.loop();
  }

  update(dt: number) {
    //
  }

  draw() {
    this.ctx.font = "80px VT323";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "center";
    this.ctx.fillText("MENU", this.canvas.width >> 1, 100);
    this.ctx.font = "30px VT323";
    this.ctx.fillText("ANY KEY TO PLAY", this.canvas.width >> 1, this.canvas.height * .9);
  }

  terminate() {
    document.getElementById("mainCanvas").remove();
  }
}