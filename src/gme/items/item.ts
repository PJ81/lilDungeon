export default class Item {
  name: string;
  slotIdx: number;

  constructor(name: string, slot: number) {
    this.name = name;
    this.slotIdx = slot;
  }
}