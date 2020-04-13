import * as Const from "../../eng/const.js";
import Entity from "../entity/entity.js";
import Player from "../entity/player.js";
import Monster from "../entity/monsters/monster.js";

export default class FightManager {
  constructor() {
    //
  }

  attack(attacker: Entity, defender: Entity): number {
    const hit = this.calcHits(attacker);
    const def = this.calcDef(defender);
    if (hit > def) {
      defender.health -= hit;
      return hit;
    }
    return 0;
  }

  calcHits(attacker: Entity): number {
    let hit = 0;
    for (let z = 0; z < attacker.attack; z++) {
      if (Const.lcg.rollDice(1, 100) > 100 - attacker.hitChance)
        hit++;
    }
    return hit;
  }

  calcDef(defender: Entity): number {
    let def = 0;
    for (let z = 0; z < defender.defense; z++) {
      if (Const.lcg.rollDice(1, 100) > 100 - defender.defChance)
        def++;
    }
    return def;
  }

  fight(player: Player, monster: Monster) {
    const hit = this.attack(player, monster);
    player.weapon.getDamage(hit >> 1);
    monster.armor.getDamage(hit >> 1);
    if (monster.health > 0) {
      this.attack(monster, player);
      player.armor.getDamage(hit >> 1);
      monster.weapon.getDamage(hit >> 1);
      if (player.health <= 0) {
        window.dispatchEvent(new CustomEvent("StateChange", {
          detail: {
            state: Const.GMOR
          }
        }));
      }
    } else {
      player.xperience += monster.xperience;
      player.pointsToNextLevel -= monster.xperience;
      if (player.pointsToNextLevel <= 0) {
        player.level++;
        player.pointsToNextLevel += player.level * 5;
        player.healthO += 2;
        player.health++;
      }
      return true;
    }

    return false;
  }

}