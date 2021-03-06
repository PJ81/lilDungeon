import { PLAY, PRESSED, WIDTH } from "../../eng/const.js";
import Keyboard from "../../eng/keyboard.js";
import NameGen from "../tools/namegen.js";
import { printBorders } from "../tools/startMsg.js";
import State from "./state.js";

export default class Menu extends State {
  nameGen: NameGen;
  playerName: string;
  newName: () => void;

  constructor() {
    super();
    this.update = (dt: number) => { }
    this.newName = () => { this.playerName = this.nameGen.getName(); }
    this.nameGen = new NameGen();
    this.newName();
  }

  start(keyboard: Keyboard) {
    keyboard.addKey(78, (e: number) => { if (e === PRESSED) this.newName(); });
    keyboard.addKey(32, () => {
      window.dispatchEvent(new CustomEvent("StateChange", {
        detail: {
          state: PLAY,
          playerName: this.playerName
        }
      }));
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    const m = WIDTH >> 1;
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "10px Roboto Mono";
    let l = 50;
    ctx.fillText(`Welcome ${this.playerName}!`, m, l);
    ctx.font = "6px Roboto Mono";
    ctx.fillText(`If you'd prefer another name, press[N]`, m, l + 12);

    ctx.font = "7px Roboto Mono";
    l = 105;
    ctx.fillText(`If you feeling brave enough, try to find all`, m, l);
    ctx.fillText(`six sacred items scattered in the dungeon and`, m, l += 10);
    ctx.fillText(`bring them to the sanctuary in its deepest level.`, m, l += 10);
    ctx.fillText(`This is not going to be an easy task...`, m, l += 10);
    ctx.fillText(`I wish you luck, ${this.playerName}.`, m, l += 20);

    printBorders(ctx);
  }
}