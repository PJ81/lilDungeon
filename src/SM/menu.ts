import { HEIGHT, PLAY, PRESSED, WIDTH } from "../eng/const.js";
import Keyboard from "../eng/keyboard.js";
import NameGen from "../gme/tools/namegen.js";
import State from "./state.js";

export default class Menu extends State {
  nameGen: NameGen;
  playername: string;
  newName: () => void;

  constructor() {
    super();
    this.update = (dt: number) => { }
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

  draw(ctx: CanvasRenderingContext2D) {
    const m = WIDTH >> 1;
    ctx.font = "30px Roboto Mono";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("MENU", m, 60);

    ctx.font = "18px Roboto Mono";
    let l = 150;
    ctx.fillText(`Welcome ${this.playername}!`, m, l);
    ctx.font = "11px Roboto Mono";
    ctx.fillText(`If you'd prefer another name, press[N]`, m, l + 25);

    ctx.font = "12px Roboto Mono";
    l = 240;
    ctx.fillText(`If you feel brave enough, find all six sacred`, m, l);
    ctx.fillText(`items scattered in the dungeon and bring them`, m, l += 20);
    ctx.fillText(`to the sanctuary in its deepest level.`, m, l += 20);
    ctx.fillText(`This is not going to be an easy task...`, m, l += 20);
    ctx.fillText(`I wish you luck, ${this.playername}.`, m, l += 20);

    ctx.font = "10px Roboto Mono";
    ctx.fillText("PRESS [SPACE] TO PLAY", m, HEIGHT * .95);
  }
}