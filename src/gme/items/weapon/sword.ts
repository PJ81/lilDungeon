import Weapon from "./weapon.js";

export default class Sword extends Weapon {
  constructor(slot: number) {
    super("Sword", slot);
  }
}