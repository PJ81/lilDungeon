import { HEIGHT, MENU, WIDTH } from "../../eng/const.js";
import Keyboard from "../../eng/keyboard.js";
import Player from "../entity/player.js";
import { printBorders } from "../tools/startMsg.js";
import State from "./state.js";

export default class Sanctuary extends State {
  player: Player;

  constructor() {
    super();
    this.update = (dt: number) => { }
  }

  start(keyboard: Keyboard, player: Player) {
    this.player = player;
    keyboard.addKey(32, () => {
      window.dispatchEvent(new CustomEvent("StateChange", {
        detail: {
          state: MENU
        }
      }));
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.player.sacredItems.length > 5) this.drawWin(ctx);
    else this.drawLose(ctx);

    ctx.font = "6px Roboto Mono";
    ctx.fillText("PRESS [SPACE] TO PLAY", WIDTH >> 1, HEIGHT * .95);

    printBorders(ctx);
  }

  private drawWin(ctx: CanvasRenderingContext2D) {
    const m = WIDTH >> 1;
    ctx.font = "15px Roboto Mono";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("CONGRATULATIONS!", m, 47);

    ctx.font = "9px Roboto Mono";
    let l = 60;
    ctx.fillText(`${this.player.name}, you did it very well!`, m, l);

    ctx.font = "7px Roboto Mono";
    l = 105;
    ctx.fillText(`I knew I could count on you to bring all the`, m, l);
    ctx.fillText(`sacred items back to their sacred places.`, m, l += 10);
    ctx.fillText(`It was certainly not an easy task`, m, l += 10);
    ctx.fillText(`but you mastered it bravely!`, m, l += 10);
    ctx.fillText(`I thank you very much ${this.player.name}.`, m, l += 10);
  }

  private drawLose(ctx: CanvasRenderingContext2D) {
    const m = WIDTH >> 1;
    ctx.font = "15px Roboto Mono";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("OH NO!", m, 47);

    ctx.font = "9px Roboto Mono";
    let l = 60;
    ctx.fillText(`You disappointed me ${this.player.name}!`, m, l);

    ctx.font = "7px Roboto Mono";
    l = 105;
    ctx.fillText(`I thought you would make it.`, m, l);
    ctx.fillText(`I thought you would bring the sacred items`, m, l += 10);
    ctx.fillText(`back to their sacred places.`, m, l += 10);
    ctx.fillText(`It was certanlly not an easy task, I know,`, m, l += 10);
    ctx.fillText(`but I've expected more from!`, m, l += 10);
    ctx.fillText(`Try again, ${this.player.name}, maybe this time...`, m, l += 10);
  }
}