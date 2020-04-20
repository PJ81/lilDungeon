import { CARCASS, lcg } from "../../../eng/const.js";
import Chainmail from "../armor/chainmail.js";
import Leather from "../armor/leather.js";
import Dagger from "../weapon/dagger.js";
import Sword from "../weapon/sword.js";
import Coin from "./coin.js";
import Container from "./container.js";
import Food from "./food.js";
import Potion from "./potion.js";
import Trap from "./trap.js";

export default class Carcass extends Container {
  constructor(slot: number) {
    super("Carcass", CARCASS, slot);
  }

  createNewItem() {
    let z: number;
    if (lcg.rollDice(1, 100) < 15) {
      z = lcg.rollDice(1, 5);
      switch (z) {
        case 1: this.item = new Trap(this.slotIdx); break;
        case 2: this.item = new Chainmail(this.slotIdx); break;
        case 3: this.item = new Sword(this.slotIdx); break;
        case 4: this.item = new Leather(this.slotIdx); break;
        case 5: this.item = new Dagger(this.slotIdx); break;
      }
    } else {
      z = lcg.rollDice(1, 4)
      switch (z) {
        case 1: this.item = new Trap(this.slotIdx); break;
        case 2: this.item = new Potion(this.slotIdx); break;
        case 3: this.item = new Coin(this.slotIdx); break;
        case 4: this.item = new Food(this.slotIdx); break;
      }
    }
  }
}