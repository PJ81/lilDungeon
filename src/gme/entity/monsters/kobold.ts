import Monster from "./monster.js";
import BareHands from "../../items/weapon/bareHands.js";
import CottonShirt from "../../items/armor/cottonShirt.js";

export default class Kobold extends Monster {
  constructor(slot: number) {
    super("Kobold", slot);
    this.setOriginals(3, 1, 1, 5, 5);
    this.equip(new BareHands("Bare Claws"));
    this.equip(new CottonShirt("Thick Skin"));

    this.xperience = 1;
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