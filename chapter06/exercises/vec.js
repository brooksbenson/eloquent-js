/*
  Write a class Vec that represents a vector in two-dimensional
  space. It takes x and y parameters (numbers), which it should
  save to properties of the same name.

  Give the Vec prototype two methods, plus and minus, that take
  another vector as a parameter and return a new vector that has
  the sum or difference of the two vectors.

  Write another prototype method called length that returns the
  distance between the vector and the origin (0, 0)
*/

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }
  minus(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }
  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}