import Weapon from "./weapon.js";

export default class Knife extends Weapon {
  constructor(slot: number) {
    super("Knife", slot);
  }
}