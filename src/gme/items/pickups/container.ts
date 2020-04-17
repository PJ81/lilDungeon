import Item from "../item.js";

export default class Container extends Item {
  createNewItem() {
    throw new Error("Method not implemented.");
  }

  item: Item;
  itemType: number;

  constructor(name: string, slot: number) {
    super(name, slot);
    this.createNewItem();
  }
}