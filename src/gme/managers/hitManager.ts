import * as Const from "../../eng/const.js";
import Slot from "../dungeon/slot.js";
import Monster from "../entity/monsters/monster.js";


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
        case Const.CARCASS:
        case Const.CHEST: this.startEvent("Surprise", slot.item); break;
        case Const.FOOD: this.startEvent("Eat", slot.item); break;
        case Const.POTION: this.startEvent("Drink", slot.item); break;
        case Const.COINS: this.startEvent("Coins", slot.item); break;
        case Const.KNIFE:
        case Const.SWORD: this.startEvent("EquipWeapon", slot.item); break;
        case Const.BREASTPLATE:
        case Const.CHAINMAIL: this.startEvent("EquipArmor", slot.item); break;
        case Const.STAIRS: this.startEvent("GoDown"); break;
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