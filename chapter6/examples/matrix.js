let okIterator = 'ok'[Symbol.iterator]();
okIterator(); // { value: 'o', done: false }
okIterator(); // { value: 'k', done: false }
okIterator(); // { value: undefined, done: true }

class Matrix {
  constructor(width, height, content = () => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        content[y * width + x] = content(x, y);
      }
    }
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }

  [Symbol.iterator]() {
    return new MatrixIterator(this);
  }
}

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y = this.matrix.height) {
      return {done: true};
    }

    let value = {
      x: this.x,
      y: this.y,
      value: this.matrix.get(this.x, this.y)
    };

    this.x++;
    if (this.x === matrix.width) {
      this.x = 0;
      this.y++;
    }

    return {value, done: false};
  }
}

//In a symmetric matrix, the values stored at (x, y)
//equal that at (y, x)