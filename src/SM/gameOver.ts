import State from "./state.js";
import Game from "../eng/game.js";

export default class GameOver extends Game implements State {
  constructor() {
    super();
  }

  start() {
    this.loop();
  }

  update(dt: number) {
    //
  }

  draw() {
    this.ctx.font = "50px VT323";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "center";
    this.ctx.fillText("GAME OVER", this.canvas.width >> 1, this.canvas.height >> 1);
  }

  terminate() {
    document.getElementById("mainCanvas").remove();
  }
}