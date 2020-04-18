import { OGER } from "../../../eng/const.js";
import CottonShirt from "../../items/armor/cottonShirt.js";
import BareHands from "../../items/weapon/bareHands.js";
import Monster from "./monster.js";

export default class Oger extends Monster {
  constructor(idx: number) {
    super("Oger", OGER, idx);
    this.setOriginals(3, 1, 1, 5, 5);
    this.equip(new BareHands());
    this.equip(new CottonShirt());

    this.xperience = 1;
  }
}