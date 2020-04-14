import State from "./state.js";
import Game from "../eng/game.js";
import { MENU } from "../eng/const.js";
import NameGen from "../gme/tools/namegen.js";

export default class GameOver extends Game implements State {
  text1: string;
  text2: string;
  text3: string;
  name: any;
  monster: string;
  text4: string;

  constructor() {
    super();
    const ng = new NameGen(),
      depth = 8,
      points = 523,
      gold = 53,
      moves = 2356,
      level = 6,
      hp = 41;

    this.name = ng.getName();
    this.monster = "Bat";

    this.text1 = `${this.name}, you were killed by a ${this.monster} in the dungeon`;
    this.text2 = `level ${depth}, with ${points} points and ${gold} pieces of gold.`;
    this.text3 = `After ${moves} moves, you were level ${level},`;
    this.text4 = `with a maximum of ${hp} hit points.`;
  }

  start() {
    this.keyboard.addKey(32, () => {
      window.dispatchEvent(new CustomEvent("StateChange", {
        detail: {
          state: MENU
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
    this.ctx.fillText("YOU DIED!", m, 60);
    this.ctx.font = "12px Roboto Mono";
    this.ctx.fillText("PRESS [SPACE] TO PLAY", m, this.canvas.height * .95);

    this.ctx.fillText("          ______         ", m, 132);
    this.ctx.fillText("       ___/      \\\\_       ", m, 147);
    this.ctx.fillText("        /              \\\\       ", m, 157);
    this.ctx.fillText("        /   + R.I.P +   \\\\       ", m, 170);
    this.ctx.fillText("        /                \\\\       ", m, 183);
    this.ctx.fillText("        |                 ||       ", m, 196);
    this.ctx.fillText("        " + this.makeLine(this.name) + "       ", m, 211);
    this.ctx.fillText("        |                 ||       ", m, 225);
    this.ctx.fillText("        |   killed by a   ||       ", m, 239);
    this.ctx.fillText("        |                 ||       ", m, 253);
    this.ctx.fillText("        " + this.makeLine(this.monster) + "       ", m, 267);
    this.ctx.fillText("        |                 ||       ", m, 281);
    this.ctx.fillText("      * |    *     *    * || *     ", m, 295);
    this.ctx.fillText("_______)/\\\\//(\\/(/_\\)/\\//\\/||_)_____", m, 309);

    this.ctx.fillText(this.text1, m, 350);
    this.ctx.fillText(this.text2, m, 367);
    this.ctx.fillText(this.text3, m, 384);
    this.ctx.fillText(this.text4, m, 401);
  }

  makeLine(w: string): string {
    let s = "|";
    let t = (17 - w.length) >> 1;
    for (let r = 0; r < t; r++) s += " ";
    s += w;
    for (let r = 0; r < t; r++) s += " ";
    s += ((w.length & 1) === 1) ? "||" : " ||";
    return s;
  }

  terminate() {
    this.keyboard.clear();
    this.keyboard = null;
    document.getElementById("mainCanvas").remove();
  }
}