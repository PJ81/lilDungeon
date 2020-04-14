import CottonShirt from "../items/armor/cottonShirt.js";
import BareHands from "../items/weapon/bareHands.js";
import Inventory from "../items/inventory.js";
import Entity from "./entity.js";

export default class Player extends Entity {
  level: number;
  pointsToNextLevel: number;
  inventory: Inventory;

  constructor() {
    super("Player");
    this.setOriginals(15, 2, 2, 7, 7);
    this.equip(new CottonShirt("Cotton Shirt"));
    this.equip(new BareHands("Bare Hands"));
    this.level = 1;
    this.pointsToNextLevel = 5;
    this.inventory = new Inventory(8);
  }
}