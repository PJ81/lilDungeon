import { HEIGHT, WIDTH } from "../../eng/const.js";

function startEvent(action: string, ...actions: any[]) {
  window.dispatchEvent(new CustomEvent(action, {
    detail: {
      arg1: actions[0],
      arg2: actions[1]
    }
  }));
}

function printBorders(ctx: CanvasRenderingContext2D) {
  ctx.font = "6px Roboto Mono";
  ctx.fillText("PRESS [SPACE] TO PLAY", WIDTH >> 1, HEIGHT * .95);

  ctx.textAlign = "left";
  ctx.font = "10px Roboto Mono";
  for (let r = 19; r < 234; r += 10) {
    ctx.fillText("!", 3, r);
    ctx.fillText("!", 231, r);
  }

  ctx.font = "9px Roboto Mono";
  ctx.fillText("+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+", 3, 8);
  ctx.fillText("+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~+", 3, 238);
}


export { startEvent, printBorders };

