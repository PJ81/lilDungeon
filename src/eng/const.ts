import Point from "./point.js";
import LCG from "../gme/tools/lcg.js";

export const
  lcg = new LCG(),

  WIDTH = 480,
  HEIGHT = 480,
  TILE_S = 9,
  SCALE = 1,
  PRESSED = 1,
  RELEASED = 0,

  NW = 103,
  N = 104,
  NE = 105,
  E = 102,
  W = 100,
  SW = 97,
  S = 98,
  SE = 99,

  VN = 0,
  VE = 1,
  VS = 2,
  VW = 3,
  VNW = 4,
  VNE = 5,
  VSW = 6,
  VSE = 7,

  DIRECTION = [
    new Point(0, -1),
    new Point(1, 0),
    new Point(0, 1),
    new Point(-1, 0),
    new Point(-1, -1),
    new Point(1, -1),
    new Point(-1, 1),
    new Point(1, 1)
  ],

  SLOTS_POS = [
    new Point(2, 1),
    new Point(3, 2),
    new Point(2, 3),
    new Point(1, 2),
    new Point(1, 1),
    new Point(3, 1),
    new Point(1, 3),
    new Point(3, 3)
  ],

  FLOOR = 0,
  WALL = 2,
  DOOR = 4,
  PLAYER = 27,

  STAIRS = 6,

  SKELETON = 14,
  CHEST = 26,

  TRAP = 16,

  FOOD = 18,
  COINS = 19,
  POTION = 20,
  BOW = 23,
  SWORD = 24,
  ARMOR = 25,
  WEAPON = 26,


  DRAGON = 29,
  ZOMBIE = 31,
  SNAKE = 35,
  OGER = 37,
  BAT = 39,
  KOBOLD = 49;