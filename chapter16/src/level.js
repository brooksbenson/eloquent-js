import { Player, Lava, Coin } from './actors';
import { Vec } from './utils';
/* 
  Characters that compose a serialized level
  plan and their corresponding values. The
  non-string values are what are known as actors.
*/

const levelChars = {
  '.': 'empty',
  '#': 'wall',
  '+': 'lava',
  '@': Player,
  '=': Lava,
  '|': Lava,
  v: Lava,
  o: Coin
  // M: Monster
};

/*
  Level converts a serialized level plan into a data
  structure. The actors property stores an array
  of absolutely positioned actors that move across
  a background.
*/

class Level {
  constructor(plan) {
    const rows = plan
      .trim()
      .split('\n')
      .map(l => [...l]);
    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = []; // moving elements

    /*
      this.rows is binded to the transformed version
      of rows where each value contained in every row
      is mapped to its non-serialized value denoted in
      the levelChars object.
    */

    this.rows = rows.map((row, y) =>
      row.map((char, x) => {
        const type = levelChars[char];
        if (typeof type == 'string') return type;

        // if the type is not a string then it's an
        // actor and gets added to the list of actors
        // for the particular level.

        this.startActors.push(type.create(new Vec(x, y), char));
        return 'empty';
      })
    );
  }
}

/*
  Before each animation, the game needs to check
  whether two objects will touch. The function below 
  is designed to return true or false based on whether
  an object of a given type touches another.
*/

Level.prototype.touches = function(pos, size, type) {
  let xStart = Math.floor(pos.x);
  let xEnd = Math.ceil(pos.x + size.x);
  let yStart = Math.floor(pos.y);
  let yEnd = Math.ceil(pos.y + size.y);

  /*
    The computations above derive a grid range
    in the x and y directions from the pos and
    size arguments. By plugging these values
    into a loop, we can check every grid element
    for a given level in the defined range and
    see what's there.
  */

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
      let here = isOutside ? 'wall' : this.rows[y][x];
      if (here == type) return true;
    }
  }
  return false;
};

export default Level;
