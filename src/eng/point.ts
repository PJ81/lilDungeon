export default class Point {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x;
    this.y;
    this.set(x, y);
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(pt: Point) {
    return pt.x === this.x && pt.y === this.y;
  }

  distSqr(pt: Point) {
    let a = pt.x - this.x,
      b = pt.y - this.y;
    return (a * a + b * b);//Math.sqrt
  }

  copy() {
    return new Point(this.x, this.y);
  }

  add(pt: Point) {
    this.x += pt.x;
    this.y += pt.y;
  }
}