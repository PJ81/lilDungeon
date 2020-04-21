import { GMOR, lcg, NO_POS, PLAYER } from "../../eng/const.js";
import CottonShirt from "../items/armor/cottonShirt.js";
import Item from "../items/item.js";
import BareHands from "../items/weapon/bareHands.js";
import startEvent from "../tools/startMsg.js";
import Entity from "./entity.js";

export default class Player extends Entity {
  level: number;
  gold: number;
  moves: number;
  depth: number;
  hasKey: boolean;
  sacredItems: Item[];
  pointsToNextLevel: number;

  constructor(playername: string) {
    super(playername, PLAYER, NO_POS);
    this.reset(playername);
  }

  reset(playername: string) {
    this.setMax(15, 2, 2, 7, 7);
    this.equip(new CottonShirt());
    this.equip(new BareHands());
    this.sacredItems = new Array();
    this.level = 1;
    this.pointsToNextLevel = 5;
    this.gold = 0;
    this.moves = 0;
    this.depth = 1;
    this.name = playername;
    this.hasKey = false;
  }

  updateXP(xp: number) {
    this.experience += xp;
    this.pointsToNextLevel -= xp;
    if (this.pointsToNextLevel <= 0) {
      this.level++;
      this.pointsToNextLevel += this.level * 5;
      this.healthMax += 2;
      this.attackMax += 2;
      this.defenseMax += 2;
      this.hitChance++;
      this.defChance++;
      this.health += lcg.rollDice(2, 3);
      if (this.health > this.healthMax) this.health = this.healthMax;

      startEvent("Message", `Level up.`);
    }
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