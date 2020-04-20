import LCG from "../gme/tools/lcg.js";
import Point from "./point.js";

export const
  lcg = new LCG(),

  WIDTH = 480,
  HEIGHT = 480,
  TILE_S = 9,
  SCALE = 1,
  PRESSED = 1,
  RELEASED = 0,
  ARMOR = 1,
  WEAPON = 2,
  NO_TYPE = -1,
  NO_POS = -1,

  // keys
  NW = 103,
  N = 104,
  NE = 105,
  E = 102,
  W = 100,
  SW = 97,
  S = 98,
  SE = 99,

  // indexes
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

  // entities
  PLAYER = 18,
  FLOOR = 0,
  WALL = 2,
  DOOR = 4,
  STAIRS = 6,
  TRAP = 9,
  FOOD = 11,
  COIN = 10,
  POTION = 12,
  CHEST = 17,
  CARCASS = 8,
  DAGGER = 13,
  SWORD = 15,
  LEATHER = 16,
  CHAINMAIL = 14,

  // monsters
  MON_COUNT = 8,

  BAT = 23,
  SNAKE = 21,
  KOBOLD = 24,
  TROLL = 25,
  ZOMBIE = 20,
  YETI = 26,
  OGER = 22,
  DRAGON = 19,

  // states
  PLAY = 1,
  MENU = 2,
  GMOR = 3;

