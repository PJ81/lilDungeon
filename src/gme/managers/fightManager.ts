import * as Const from "../../eng/const.js";
import Entity from "../entity/entity.js";
import Monster from "../entity/monsters/monster.js";
import Player from "../entity/player.js";
import startEvent from "../tools/startMsg.js";

export default class FightManager {
  constructor() {
    //
  }

  attack(attacker: Entity, defender: Entity): number {
    const hit = this.calcHits(attacker);
    const def = this.calcDef(defender);
    if (hit > def) {
      return hit;
    } else if (def > hit) {
      return -def;
    }
    return 0;
  }

  calcHits(attacker: Entity): number {
    let hit = 0, atk = attacker.hitChance + attacker.weapon.hitChance;
    for (let z = 0; z < attacker.attack; z++) {
      if (Const.lcg.rollDice(1, 100) > 100 - atk)
        hit++;
    }
    return hit;
  }

  calcDef(defender: Entity): number {
    let def = 0, df = defender.defChance + defender.armor.defChance;
    for (let z = 0; z < defender.defense; z++) {
      if (Const.lcg.rollDice(1, 100) > 100 - df)
        def++;
    }
    return def;
  }

  fight(player: Player, monster: Monster): boolean {
    let atk = this.attack(player, monster);
    if (atk < 0) {
      startEvent("Message", `${monster.name} blocks your attack.`);
      player.weapon.getDamage(atk / 1.5);
      monster.armor.getDamage(atk >>> 1);
      this.fightBack(player, monster);
    } else if (atk === 0) {
      startEvent("Message", `You miss ${monster.name}.`);
      this.fightBack(player, monster);
    } else {
      startEvent("Message", `You hit ${monster.name} for ${atk} damage.`);
      player.weapon.getDamage(atk >>> 1);
      monster.armor.getDamage(atk / 1.5);
      monster.takeDamage(atk, player);
      if (monster.health > 0) {
        this.fightBack(player, monster);
      } else {
        player.xperience += monster.xperience;
        player.pointsToNextLevel -= monster.xperience;
        if (player.pointsToNextLevel <= 0) {
          player.level++;
          player.pointsToNextLevel += player.level * 5;
          player.healthO += 2;
          player.health++;
          startEvent("Message", `Level up.`);
        }
        return true;
      }
    }
    return false;
  }

  fightBack(player: Player, monster: Monster) {
    let atk = this.attack(monster, player);
    if (atk < 0) {
      startEvent("Message", `You blocked ${monster.name}'s attack.`);
      monster.weapon.getDamage(atk / 1.5);
      player.armor.getDamage(atk >>> 1);
    } else if (atk === 0) {
      startEvent("Message", `${monster.name} miss you.`);
    } else {
      startEvent("Message", `${monster.name} hits you for ${atk} damage.`);
      monster.weapon.getDamage(atk >>> 1);
      player.armor.getDamage(atk / 1.5);
      player.takeDamage(atk, monster);
    }
  }
}