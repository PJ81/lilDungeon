import Item from "../item.js";

export default class Container extends Item {
  createNewItem() {
    throw new Error("Method not implemented.");
  }

  item: Item;
  itemType: number;

  constructor(name: string, type: number, idx: number) {
    super(name, type, idx);
    this.createNewItem();
  }
}