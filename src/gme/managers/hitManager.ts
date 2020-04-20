import * as Const from "../../eng/const.js";
import Monster from "../entity/monsters/monster.js";
import Item from "../items/item.js";
import startEvent from "../tools/startMsg.js";


export default class HitManager {
  constructor() {
    //
  }

  hit(itm: Item, hitDir: number) {
    if (!itm) {
      if (hitDir in [Const.VN, Const.VE, Const.VS, Const.VW]) {
        startEvent("Action", "Walk", hitDir);
      }
    } else {
      if (itm instanceof Monster) {
        startEvent("Action", "Fight", itm);
        return;
      }
      switch (itm.type) {
        case Const.CARCASS:
        case Const.CHEST: startEvent("Action", "Surprise", itm); break;
        case Const.FOOD: startEvent("Action", "Eat", itm); break;
        case Const.POTION: startEvent("Action", "Drink", itm); break;
        case Const.COIN: startEvent("Action", "Coins", itm); break;
        case Const.DAGGER:
        case Const.SWORD: startEvent("Action", "EquipWeapon", itm); break;
        case Const.LEATHER:
        case Const.CHAINMAIL: startEvent("Action", "EquipArmor", itm); break;
        case Const.STAIRS: startEvent("Action", "GoDown"); break;
        case Const.TRAP: startEvent("Action", "Trap", itm); break;
      }
    }
  }
}