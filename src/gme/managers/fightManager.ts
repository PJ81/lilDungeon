import * as Const from "../../eng/const.js";
import Entity from "../entity/entity.js";

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
}