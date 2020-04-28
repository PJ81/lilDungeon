import LCG from "../gme/tools/lcg.js";
import Point from "./point.js";

export const
  //linear congruential generator
  lcg = new LCG(),

  WIDTH = 240, HEIGHT = 240, SCALE = 2, TILE_S = 9,
  PRESSED = 1, RELEASED = 0,
  ARMOR = 1, WEAPON = 2,
  NO_TYPE = -1, NO_POS = -1,

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
    new Point(0, -1), new Point(1, 0),
    new Point(0, 1), new Point(-1, 0),
    new Point(-1, -1), new Point(1, -1),
    new Point(-1, 1), new Point(1, 1)
  ],

  SLOTS_POS = [
    new Point(2, 1), new Point(3, 2),
    new Point(2, 3), new Point(1, 2),
    new Point(1, 1), new Point(3, 1),
    new Point(1, 3), new Point(3, 3)
  ],

  // entities
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

  PLAYER = 18,

  // monsters
  MON_COUNT = 10,

  DRAGON = 19,
  ZOMBIE = 20,
  SNAKE = 21,
  OGER = 22,
  BAT = 23,
  KOBOLD = 24,
  TROLL = 25,
  YETI = 26,
  SPIDER = 27,
  VAMPIRE = 28,

  // sacreed items
  SACRED_ITEMS = 6,

  THE_BOOK_OF_DEATH = 40,
  KISMET_GEM = 41,
  ICHORS_TIARA = 42,
  HEROS_SANDALS = 43,
  LETTERS_OF_GRACE = 44,
  SHIELD_OF_MENDING = 45,

  SACRED = [
    ["The Book of Death", THE_BOOK_OF_DEATH], ["", NO_TYPE],
    ["Kismet Gem", KISMET_GEM], ["", NO_TYPE],
    ["Ichor's Tiara", ICHORS_TIARA], ["", NO_TYPE],
    ["Hero's Sandals", HEROS_SANDALS], ["", NO_TYPE],
    ["Letters of Grace", LETTERS_OF_GRACE], ["", NO_TYPE],
    ["Shield of Mending", SHIELD_OF_MENDING]],

  ORDINALS = ["first", "second", "third", "fourth", "fifth", "sixth"],

  // sacred item room key
  KEY = 46,

  // sanctuary level
  SANCTUARY = 15,

  // states
  PLAY = 0,
  MENU = 1,
  GMOR = 2,
  SANC = 3;

