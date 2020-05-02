import { MENU, WIDTH } from "../../eng/const.js";
import Keyboard from "../../eng/keyboard.js";
import Player from "../entity/player.js";
import Item from "../items/item.js";
import { printBorders } from "../tools/startMsg.js";
import State from "./state.js";

export default class GameOver implements State {
  killer: Item;
  player: Player;
  update: (dt: number) => void;

  constructor() {
    this.update = (dt: number) => { }
  }

  start(keyboard: Keyboard, player: Player, killer: Item) {
    this.player = player;
    this.killer = killer;
    keyboard.addKey(32, () => {
      window.dispatchEvent(new CustomEvent("StateChange", {
        detail: {
          state: MENU
        }
      }));
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    const m = WIDTH >> 1;
    ctx.font = "30px Roboto Mono";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("YOU DIED!", m, 80);

    ctx.font = "12px Roboto Mono";
    ctx.fillText("          ______         ", m, 132);
    ctx.fillText("       ___/      \\\\_       ", m, 147);
    ctx.fillText("        /              \\\\       ", m, 157);
    ctx.fillText("        /   + R.I.P +   \\\\       ", m, 170);
    ctx.fillText("        /                \\\\       ", m, 183);
    ctx.fillText("        |                 ||       ", m, 196);
    ctx.fillText("        |                 ||       ", m, 211);
    ctx.fillText("        |                 ||       ", m, 225);
    ctx.fillText("        |                 ||       ", m, 239);
    ctx.fillText("        |                 ||       ", m, 253);
    ctx.fillText("        |                 ||       ", m, 267);
    ctx.fillText("        |                 ||       ", m, 281);
    ctx.fillText("      * |    *     *    * || *     ", m, 295);
    ctx.fillText("_______)/\\\\//(\\/(/_\\)/\\//\\/||_)_____", m, 309);

    ctx.fillText(this.player.name, m, 220);
    ctx.fillText("killed by a", m, 239);
    ctx.fillText(this.killer.name, m, 258);

    ctx.fillText(`${this.player.name}, you were killed by a ${this.killer.name} in the dungeon`, m, 350);
    ctx.fillText(`level ${this.player.depth}, with ${this.player.experience} points and ${this.player.gold} pieces of gold.`, m, 367);
    ctx.fillText(`After ${this.player.moves} moves, you were level ${this.player.level},`, m, 384);
    ctx.fillText(`with a maximum of ${this.player.attackMax + this.player.weapon.attackMax} hit points.`, m, 401);

    printBorders(ctx);
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
}