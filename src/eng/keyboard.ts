import { PRESSED, RELEASED } from "./const.js";

export default class Keyboard {
  keyState: Map<number, number>;
  keyAction: Map<number, Function>;
  addKey: (k: number, a: Function) => void;

  constructor() {
    this.keyState = new Map();
    this.keyAction = new Map();

    window.addEventListener("keydown", (e) => this.action(e));
    window.addEventListener("keyup", (e) => this.action(e));

    this.addKey = (k: number, a: Function) => {
      this.keyAction.set(k, a);
      this.keyState.set(k, RELEASED);
    };
  }

  action(e: KeyboardEvent) {
    if (!this.keyState.has(e.keyCode)) return;

    e.preventDefault();

    const keyS = e.type === "keydown" ? PRESSED : RELEASED;

    if (this.keyState.get(e.keyCode) !== keyS) {
      this.keyState.set(e.keyCode, keyS);
      this.keyAction.get(e.keyCode)(keyS);
    }
  }

  clear() {
    this.keyState.clear();
    this.keyAction.clear();
  }
}