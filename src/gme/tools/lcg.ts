export default class LCG {
  _seed: number;
  a: number;
  c: number;
  m: number;
  maxValue: number;

  constructor(s: number = 0) {
    this._seed
    this.a = 1103515245;
    this.c = 12345;
    this.m = Math.pow(2, 31);
    this.seed(s);
  }

  seed(s: number) {
    if (s === 0) {
      s = new Date().getMilliseconds();
    }
    this._seed = s;
  }

  rand(): number {
    this._seed = (this.a * this._seed + this.c) % this.m;
    return this._seed / this.m;
  }

  randNbr(n: number): number {
    return this.rand() * n;
  }

  randNbrI(n: number): number {
    return ~~(this.randNbr(n));
  }

  randRangeF(min: number, max: number): number {
    return this.randNbr((max + 1 - min)) + min;
  }

  randRangeI(min: number, max: number): number {
    return ~~(this.randRangeF(min, max));
  }

  randPercent(): number {
    return this.randRangeI(0, 100);
  }

  rollDice(diceCount: number, diceSides: number): number {
    let res = 0;
    for (let q = 0; q < diceCount; q++) {
      res += ~~(this.randNbr(diceSides)) + 1;
    }
    return res;
  }
}