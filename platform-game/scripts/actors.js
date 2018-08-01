class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() {
    return 'player';
  }

  static create() {
    return new Player(new Vec(0, -0.5), new Vec(0, 0));
  }
}

Player.prototype.size = new Vec(0, 8, 1.5);

class Lava {
  contructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() {
    return 'lava';
  }

  static create(pos, char) {
    switch (char) {
      case '=':
        return new Lava(pos, new Vec(2, 0));
      case '|':
        return new Lava(pos, new Vec(0, 2));
      case 'v':
        return new Lava(pos, new Vec(0, 3), pos);
    }
  }
}

Lava.prototype.size = new Vec(1, 1);
