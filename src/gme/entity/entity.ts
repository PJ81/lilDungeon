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
  demTime: number;
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

  constructor(name: string, type: number, idx: number) {
    super(name, type, idx);
    this.weapon = new BareHands();
    this.armor = new CottonShirt();
    this.xperience = 0;
    this.health = 0;
    this.hitChance = 0;
    this.defChance = 0;
    this.attack = 0;
    this.defense = 0;
    this.demTime = 0;
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
    } else if (eq instanceof Armor) {
      if (this.armor !== null) {
        this.dequip(ARMOR);
      }
      this.armor = eq;
    }
  }

  dequip(r: number) {
    if (r === WEAPON) {
      this.weapon = null;
    } else {
      this.armor = null;
    }
  }

  setOriginals(t: number, a: number, d: number, h: number, c: number) {
    this.health = this.healthO = t;
    this.attackO = this.attack = a;
    this.defenseO = this.defense = d;
    this.hitChanceO = this.hitChance = h;
    this.defChanceO = this.defChance = c;
  }

  update(dt: number) {
    if (this.demTime > 0) {
      this.demTime = Math.max(this.demTime - dt, 0);
    }

    if (this.armor.health < 0) {
      this.equip(new CottonShirt());
    }

    if (this.weapon.health < 0) {
      this.equip(new BareHands());
    }
  }

  takeDamage(d: number, e: Item) {
    if (d < 1) return;
    this.health -= d;
    this.demTime = .2;
  }
}