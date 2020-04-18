import Weapon from "./weapon.js";

export default class Dagger extends Weapon {
  constructor(slot: number) {
    super("Dagger", slot);
  }
}