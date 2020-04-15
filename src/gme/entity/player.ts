import CottonShirt from "../items/armor/cottonShirt.js";
import BareHands from "../items/weapon/bareHands.js";
import Inventory from "../items/inventory.js";
import Entity from "./entity.js";

export default class Player extends Entity {
  inventory: Inventory;
  level: number;
  gold: number;
  moves: number;
  depth: number;
  pointsToNextLevel: number;

  constructor(playername: string) {
    super(playername);
    this.inventory = new Inventory(8);
    this.reset();
  }

  reset() {
    this.setOriginals(15, 2, 2, 7, 7);
    this.equip(new CottonShirt("Cotton Shirt"));
    this.equip(new BareHands("Bare Hands"));
    this.level = 1;
    this.pointsToNextLevel = 5;
    this.gold = 0;
    this.moves = 0;
    this.depth = 1;
    this.inventory.clear();
  }
}