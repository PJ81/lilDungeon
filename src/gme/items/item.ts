export default class Item {
  name: string;
  slotIdx: number;
  type: number;

  constructor(name: string, type: number, idx: number) {
    this.name = name;
    this.slotIdx = idx;
    this.type = type;
  }
}