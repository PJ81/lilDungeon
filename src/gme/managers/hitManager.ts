import * as Const from "../../eng/const.js";
import Monster from "../entity/monsters/monster.js";
import Item from "../items/item.js";


export default class HitManager {
  constructor() {
    //
  }

  hit(itm: Item, hitDir: number) {
    if (!itm) {
      if (hitDir in [Const.VN, Const.VE, Const.VS, Const.VW]) {
        this.startEvent("Walk", hitDir);
      }
    } else {
      if (itm instanceof Monster) {
        this.startEvent("Fight", itm);
        return;
      }
      switch (itm.type) {
        case Const.CARCASS:
        case Const.CHEST: this.startEvent("Surprise", itm); break;
        case Const.FOOD: this.startEvent("Eat", itm); break;
        case Const.POTION: this.startEvent("Drink", itm); break;
        case Const.COIN: this.startEvent("Coins", itm); break;
        case Const.DAGGER:
        case Const.SWORD: this.startEvent("EquipWeapon", itm); break;
        case Const.LEATHER:
        case Const.CHAINMAIL: this.startEvent("EquipArmor", itm); break;
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