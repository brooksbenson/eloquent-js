// The state stores the level data, actor data, and game status.
/*
  This is a persistent data structure: when a new state
  needs to be computed an entirely new state value is
  generated i.e. there is no mutation occuring.
*/

class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level) {
    return new State(level, level.startActors, 'playing');
  }

  get player() {
    return this.actors.find(a => a.type == 'player');
  }
}
