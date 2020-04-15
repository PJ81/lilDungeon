export default class State {
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
  }
} 