import { ARMOR, WEAPON } from "../../eng/const.js";
import Armor from "../items/armor/armor.js";
import CottonShirt from "../items/armor/cottonShirt.js";
import Equipment from "../items/equipment.js";
import Item from "../items/item.js";
import BareHands from "../items/weapon/bareHands.js";
import Weapon from "../items/weapon/weapon.js";

export default class Entity extends Item {
  weapon: Weapon;
  armor: Armor;
  health: number;
  attack: number;
  defense: number;
  hitChance: number;
  defChance: number;
  xperience: number;
  healthO: number;
  attackO: number;
  defenseO: number;
  hitChanceO: number;
  defChanceO: number;

  constructor(name: string) {
    super(name, -1);
    this.weapon = new BareHands(-1);
    this.armor = new CottonShirt(-1);
    this.xperience = 0;
    this.health = 0;
    this.hitChance = 0;
    this.defChance = 0;
    this.attack = 0;
    this.defense = 0;
    this.healthO = 0;
    this.attackO = 0;
    this.defenseO = 0;
    this.hitChanceO = 0;
    this.defChanceO = 0;
  }

  equip(eq: Equipment) {
    if (eq instanceof Weapon) {
      if (this.weapon !== null) {
        this.dequip(WEAPON);
      }
      this.weapon = eq;
      this.attack += this.weapon.attack;
      this.hitChance += this.weapon.hitChance;
    } else if (eq instanceof Armor) {
      if (this.armor !== null) {
        this.dequip(ARMOR);
      }
      this.armor = eq;
      this.defense = this.armor.defense;
      this.defChance = this.armor.defChance;
    }
  }

  dequip(r: number) {
    if (r === WEAPON) {
      this.weapon = null;
      this.attack += this.attackO;
      this.hitChance += this.hitChanceO;
    } else {
      this.armor = null;
      this.defense = this.defenseO;
      this.defChance = this.defChanceO;
    }
  }

  setOriginals(t: number, a: number, d: number, h: number, c: number) {
    this.health = this.healthO = t;
    this.attackO = this.attack = a;
    this.defenseO = this.defense = d;
    this.hitChanceO = this.hitChance = h;
    this.defChanceO = this.defChance = c;
  }
}