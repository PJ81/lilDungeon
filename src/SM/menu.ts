import State from "./state.js";
import { PLAY, PRESSED, WIDTH, HEIGHT } from "../eng/const.js";
import NameGen from "../gme/tools/namegen.js";
import Keyboard from "../eng/keyboard.js";

export default class Menu extends State {
  nameGen: NameGen;
  playername: string;
  newName: () => void;

  constructor() {
    super();
    this.newName = () => { this.playername = this.nameGen.getName(); }
    this.nameGen = new NameGen();
    this.newName();
  }

  start(keyboard: Keyboard) {
    keyboard.addKey(78, (e: number) => { if (e === PRESSED) this.newName(); });
    keyboard.addKey(32, () => {
      window.dispatchEvent(new CustomEvent("StateChange", {
        detail: {
          state: PLAY
        }
      }));
    });
  }

  update(dt: number) {
    //
  }

  draw(ctx: CanvasRenderingContext2D) {
    const m = WIDTH >> 1;
    ctx.font = "30px Roboto Mono";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("MENU", m, 60);

    ctx.font = "12px Roboto Mono";
    ctx.fillText(`Welcome ${this.playername}!`, m, 110);
    ctx.fillText(`If you'd prefer another name, press[N]`, m, 127);

    ctx.font = "10px Roboto Mono";
    ctx.fillText("PRESS [SPACE] TO PLAY", m, HEIGHT * .95);
  }
}