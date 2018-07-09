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
  o: Coin,
  M: Monster
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
