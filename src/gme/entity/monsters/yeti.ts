import Monster from "./monster.js";
import BareHands from "../../items/weapon/bareHands.js";
import CottonShirt from "../../items/armor/cottonShirt.js";

export default class Yeti extends Monster {
  constructor(slot: number) {
    super("Yeti", slot);
    this.setOriginals(3, 1, 1, 5, 5);
    this.equip(new BareHands(-1));
    this.equip(new CottonShirt(-1));

    this.xperience = 1;
  }
}