import * as Const from "../../eng/const.js";
import Entity from "../entity/entity.js";
import Monster from "../entity/monsters/monster.js";
import Player from "../entity/player.js";
import CottonShirt from "../items/armor/cottonShirt.js";
import BareHands from "../items/weapon/bareHands.js";
import { startEvent } from "../tools/startMsg.js";

export default class FightManager {
  attack: (attacker: Entity, defender: Entity) => number;

  constructor() {
    this.attack = (attacker: Entity, defender: Entity): number => { return this.calcHits(attacker) - this.calcBlk(defender); }
  }

  calcHits(attacker: Entity): number {
    let hit = 0;
    const atkChance = 100 - (attacker.atkChance + attacker.weapon.atkChance),
      atk = attacker.attack + attacker.weapon.attack;
    for (let z = 0; z < atk; z++) {
      if (Const.lcg.rollDice(1, 100) >= atkChance)
        hit++;
    }
    return hit;
  }

  calcBlk(defender: Entity): number {
    let blk = 0;
    const defChance = 100 - (defender.defChance + defender.armor.defChance),
      def = defender.defense + defender.armor.defense;
    for (let z = 0; z < def; z++) {
      if (Const.lcg.rollDice(1, 100) >= defChance)
        blk++;
    }
    return blk;
  }

  fight(player: Player, monster: Monster): boolean {
    let demage = this.attack(player, monster);
    if (demage > 0) {
      startEvent("Message", `You hit ${monster.name} for ${demage} damage`);
      if (!player.weapon.takeDamage(demage >>> 1)) {
        startEvent("Message", `Your ${player.weapon.name} is detroyed`);
        player.equip(new BareHands());
      }
      if (!monster.armor.takeDamage(demage / 1.5)) {
        monster.equip(new CottonShirt());
      }
      if (!monster.takeDamage(demage, player)) {
        player.updateXP(monster.experience);
        return true;
      } else {
        this.fightBack(player, monster);
      }
    } else {
      if (demage === 0) {
        startEvent("Message", `You miss`);
        this.fightBack(player, monster);
      } else {
        demage = Math.abs(demage);
        startEvent("Message", `${monster.name} blocks your attack`);
        if (!player.weapon.takeDamage(demage / 1.5)) {
          startEvent("Message", `Your ${player.weapon.name} is detroyed`);
          player.equip(new BareHands());
        }
        if (!monster.armor.takeDamage(demage >>> 1)) {
          monster.equip(new CottonShirt());
        }
        this.fightBack(player, monster);
      }
    }
    return false;
  }

  fightBack(player: Player, monster: Monster) {
    let demage = this.attack(monster, player);
    if (demage > 0) {
      startEvent("Message", `${monster.name} hits you for ${demage} damage`);
      if (!monster.weapon.takeDamage(demage >>> 1)) {
        monster.equip(new BareHands());
      }
      if (!player.armor.takeDamage(demage / 1.5)) {
        startEvent("Message", `Your ${player.armor.name} is detroyed`);
        player.equip(new CottonShirt());
      }
      player.takeDamage(demage, monster);
    } else {
      if (demage === 0) {
        startEvent("Message", `${monster.name} misses`);
      } else {
        demage = Math.abs(demage);
        startEvent("Message", `You blocked ${monster.name}'s attack`);
        if (!monster.weapon.takeDamage(demage / 1.5)) {
          monster.equip(new BareHands());
        }
        if (!player.armor.takeDamage(demage >>> 1)) {
          startEvent("Message", `Your ${player.armor.name} is detroyed`);
          player.equip(new CottonShirt());
        }
      }
    }
  }
}