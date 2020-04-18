import { SWORD } from "../../../eng/const.js";
import Weapon from "./weapon.js";

export default class Sword extends Weapon {
  constructor(idx: number) {
    super("Sword", SWORD, idx);
  }
}