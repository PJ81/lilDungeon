import { GMOR, NO_POS, PLAYER } from "../../eng/const.js";
import CottonShirt from "../items/armor/cottonShirt.js";
import Inventory from "../items/inventory.js";
import Item from "../items/item.js";
import BareHands from "../items/weapon/bareHands.js";
import Entity from "./entity.js";

export default class Player extends Entity {
  inventory: Inventory;
  level: number;
  gold: number;
  moves: number;
  depth: number;
  pointsToNextLevel: number;

  constructor(playername: string) {
    super(playername, PLAYER, NO_POS);
    this.inventory = new Inventory(8);
    this.reset(playername);
  }

  reset(playername: string) {
    this.setOriginals(15, 2, 2, 7, 7);
    this.equip(new CottonShirt());
    this.equip(new BareHands());
    this.level = 1;
    this.pointsToNextLevel = 5;
    this.gold = 0;
    this.moves = 0;
    this.depth = 1;
    this.name = playername;
    this.inventory.clear();
  }

  takeDamage(d: number, item: Item) {
    super.takeDamage(d, item);
    if (this.health <= 0) {
      window.dispatchEvent(new CustomEvent("StateChange", {
        detail: {
          state: GMOR,
          player: this,
          killer: item
        }
      }));
    }
  }
}