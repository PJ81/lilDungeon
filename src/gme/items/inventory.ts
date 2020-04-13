import Item from "./item.js";

export default class Inventory {
  backpack: Item[];
  maxItems: number;

  constructor(c: number) {
    this.backpack = new Array(c);
    this.maxItems = c;
  }

  pick(i: Item) {
    if (this.backpack.length >= this.maxItems) {
      // TODO: notify player not enougth place 
      return;
    }
    this.backpack.push(i);
  }

  drop(i: Item) {
    const idx = this.backpack.findIndex((t) => t.name = i.name);
    if (idx < 0) {
      // TODO notify player item was not found
      return;
    }
    this.backpack.splice(idx, 1);
  }

  look(): string[] {
    const items = [];
    this.backpack.forEach(item => {
      items.push(item.name);
    });
    return items;
  }
}