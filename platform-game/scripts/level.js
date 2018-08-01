/*
  Actor objects represent moving elements in the game:
  A level simply consists of a static background and
  then moving elements on top of it i.e. actors.

  The rows property on a level instance is an array of
  arrays: each array containing a list of strings. These
  strings are used to derive the static background of the
  game.
*/

class Level {
  contructor(plan) {
    const rows = plan
      .trim()
      .split('\n')
      .map(row => [...row]);
    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];
    this.rows = rows.map((row, y) =>
      row.map((char, x) => {
        const type = levelChars[char];
        if (typeof type === 'string') return type;
        this.startActors.push(type.create(new Vec(x, y), ch));
        return 'empty';
      })
    );
  }
}
