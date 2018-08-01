class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus({ x, y }) {
    return new Vec(this.x + x, this.y + y);
  }
  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}
