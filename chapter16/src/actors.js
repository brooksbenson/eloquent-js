import { Vec } from './utils';
import {
  playerXSpeed,
  gravity,
  jumpSpeed,
  wobbleDist,
  wobbleSpeed
} from './globals';

// PLAYER

class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() {
    return 'player';
  }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }
}

Player.prototype.size = new Vec(0.8, 1.5);

/*
  The player update method updated the players
  position and speed per axis. 
*/

Player.prototype.update = function(time, state, keys) {
  let xSpeed = 0;
  if (keys.ArrowLeft) xSpeed -= playerXSpeed;
  if (keys.ArrowRight) xSpeed += playerXSpeed;
  let pos = this.pos;
  let movedX = pos.plus(new Vec(xSpeed * time, 0));
  if (!state.level.touches(movedX, this.size, 'wall')) {
    pos = movedX;
  }

  /*
    First, xSpeed is updated according to whether the
    left or right arrow keys are held down. Then, we
    take this speed and plug it in to a new position vector,
    movedX, derived from the previous position. If the movedX
    position does not touch a wall, then its value is binded
    to the pos binding.
  */

  let ySpeed = this.speed.y + time * gravity;
  let movedY = pos.plus(new Vec(0, ySpeed * time));
  if (!state.level.touches(movedY, this.size, 'wall')) {
    pos = movedY;
  } else if (keys.ArrowUp && ySpeed > 0) {
    ySpeed = -jumpSpeed;
  } else {
    ySpeed = 0;
  }

  /*
    The first thing to note about the y axis update
    is that, if the player currently has a y speed,
    then it indicates the player is currently in a
    jump phase.

    The first condition checks if the movedY position,
    derived from the current position, touches a wall,
    and if not, then the pos binding is set to the
    movedY value.

    The second condition checks if the up arrow key
    is pressed and if ySpeed is greater than 0. If
    it is, then it indicates the thing the avatar
    his is below it, and thus the ySpeed is set to
    a negative value, causing a movement upward.
    
    If neither is the case, the player hit something,
    and the speed is set to zero.
  */

  return new Player(pos, new Vec(xSpeed, ySpeed));
};

// LAVA

class Lava {
  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() {
    return 'lava';
  }

  static create(pos, ch) {
    if (ch == '=') {
      return new Lava(pos, new Vec(2, 0));
    } else if (ch == '|') {
      return new Lava(pos, new Vec(0, 2));
    } else if (ch == 'v') {
      return new Lava(pos, new Vec(0, 3), pos);
    }
  }
}

Lava.prototype.size = new Vec(1, 1);

Lava.prototype.collide = function(state) {
  return new State(state.level, state.actors, 'lost');
};

Lava.prototype.update = function(time, state) {
  let newPos = this.pos.plus(this.speed.times(time));
  if (!state.level.touches(newPos, this.size, 'wall')) {
    return new Lava(newPos, this.speed, this.reset);
  } else if (this.reset) {
    return new Lava(this.reset, this.speed, this.reset);
  } else {
    return new Lava(this.pos, this.speed.times(-1));
  }
};

// COIN

class Coin {
  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  get type() {
    return 'coin';
  }

  static create(pos) {
    let basePos = pos.plus(new Vec(0.2, 0.1));
    /*
      To avoid having all the coins move synchronously
      in the same motion, we pass a random number as the
      wobble argument.
    */
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}

Coin.prototype.size = new Vec(0.6, 0.6);

Coin.prototype.collide = function(state) {
  let filtered = state.actors.filter(a => a != this);
  let status = state.status;
  if (!filtered.some(a => a.type == 'coin')) status = 'won';
  return new State(state.level, filtered, status);
};

Coin.prototype.update = function(time) {
  let wobble = this.wobble + time * wobbleSpeed;
  let wobblePos = Math.sin(wobble) * wobbleDist;
  return new Coin(
    this.basePos.plus(new Vec(0, wobblePos)),
    this.basePos,
    wobble
  );
};

export { Player, Lava, Coin };
