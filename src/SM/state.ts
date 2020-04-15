import Keyboard from "../eng/keyboard.js";

export default class State {
  playername: string;
  start(...args: any[]) {
    throw new Error("Method not implemented.");
  }
  update(dt: number) {
    throw new Error("Method not implemented.");
  }
  draw(ctx: CanvasRenderingContext2D) {
    throw new Error("Method not implemented.");
  }
  constructor() {
    this.playername = "";
  }
} 