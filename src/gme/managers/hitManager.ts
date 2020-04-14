import * as Const from "../../eng/const.js";
import Monster from "../entity/monsters/monster.js";
import Slot from "../dungeon/slot.js";


export default class HitManager {
  constructor() {
    //
  }

  hit(slot: Slot, hitDir: number) {
    if (!slot) {
      if (hitDir in [Const.VN, Const.VE, Const.VS, Const.VW]) {
        this.startEvent("Walk", hitDir);
      }
    } else {
      if (slot.item instanceof Monster) {
        this.startEvent("Fight", slot.item);
        return;
      }
      switch (slot.itemType) {
        case Const.SKELETON: break;
        case Const.CHEST: break;
        case Const.TRAP: break;
        case Const.FOOD: break;
        case Const.COINS: break;
        case Const.POTION: break;
        case Const.BOW: break;
        case Const.SWORD: break;
        case Const.ARMOR: break;
        case Const.STAIRS:
          this.startEvent("GoDown");
          break;
      }
    }
  }

  startEvent(...actions: any[]) {
    window.dispatchEvent(new CustomEvent("Action", {
      detail: {
        action: actions[0],
        arg: actions[1]
      }
    }));
  }
}