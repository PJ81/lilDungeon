import { lcg } from "../../../eng/const.js";
import Chainmail from "../../items/armor/chainmail.js";
import Leather from "../../items/armor/leather.js";
import Item from "../../items/item.js";
import Coin from "../../items/pickups/coin.js";
import Food from "../../items/pickups/food.js";
import Potion from "../../items/pickups/potion.js";
import Dagger from "../../items/weapon/dagger.js";
import Sword from "../../items/weapon/sword.js";
import Entity from "../entity.js";

export default class Monster extends Entity {
  item: Item;

  constructor(name: string, type: number, idx: number) {
    super(name, type, idx);
    this.createLoot();
  }

  createLoot() {
    let z: number;
    if (lcg.rollDice(1, 100) < 15) {
      z = lcg.rollDice(1, 4);
      switch (z) {
        case 1: this.item = new Dagger(this.slotIdx); break;
        case 2: this.item = new Chainmail(this.slotIdx); break;
        case 3: this.item = new Sword(this.slotIdx); break;
        case 4: this.item = new Leather(this.slotIdx); break;
      }
    } else {
      z = lcg.rollDice(1, 3)
      switch (z) {
        case 1: this.item = new Food(this.slotIdx); break;
        case 2: this.item = new Potion(this.slotIdx); break;
        case 3: this.item = new Coin(this.slotIdx); break;
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