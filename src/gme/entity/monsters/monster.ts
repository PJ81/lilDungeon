import { BREASTPLATE, CHAINMAIL, COINS, FOOD, KNIFE, lcg, POTION, SWORD } from "../../../eng/const.js";
import Slot from "../../dungeon/slot.js";
import Breastplate from "../../items/armor/breastplate.js";
import Chainmail from "../../items/armor/chainmail.js";
import Coin from "../../items/pickups/coin.js";
import Food from "../../items/pickups/food.js";
import Potion from "../../items/pickups/potion.js";
import Knife from "../../items/weapon/knife.js";
import Sword from "../../items/weapon/sword.js";
import Entity from "../entity.js";

export default class Monster extends Entity {
  slotIdx: number;
  slot: Slot;

  constructor(name: string, slot: number) {
    super(name);
    this.slotIdx = slot;
    this.createLoot();
  }

  createLoot() {
    let z;
    if (lcg.rollDice(1, 100) < 15) {
      z = lcg.rollDice(1, 4);
      switch (z) {
        case 1: this.slot = new Slot(KNIFE, new Knife(-1)); break;
        case 2: this.slot = new Slot(CHAINMAIL, new Chainmail(-1)); break;
        case 3: this.slot = new Slot(SWORD, new Sword(-1)); break;
        case 4: this.slot = new Slot(BREASTPLATE, new Breastplate(-1)); break;
      }
    } else {
      z = lcg.rollDice(1, 3)
      switch (z) {
        case 1: this.slot = new Slot(FOOD, new Food(-1)); break;
        case 2: this.slot = new Slot(POTION, new Potion(-1)); break;
        case 3: this.slot = new Slot(COINS, new Coin(-1)); break;
      }
    }
  }
}
/*
int health = Dice.Roll( "2D5" );
return new Kobold {
  Attack = Dice.Roll( "1D3" ) + level / 3,
  AttackChance = Dice.Roll( "25D3" ),
  Awareness = 10,
  Color = Colors.KoboldColor,
  Defense = Dice.Roll( "1D3" ) + level / 3,
  DefenseChance = Dice.Roll( "10D4" ),
  Gold = Dice.Roll( "5D5" ),
  Health = health,
  MaxHealth = health,
  Name = "Kobold",
  Speed = 14,
  Symbol = 'k'*/