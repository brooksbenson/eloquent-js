import { overlap } from './utils';

class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level) {
    return new State(level, level.actors, 'playing');
  }

  get player() {
    return this.actors.find(a => a.type == 'player');
  }
}

/*
  The update method is used to derive a new states
  based on time steps and actors states. The keys
  argument is a data structure for describing which
  keys are being held down.

  The actors are each updated based on their own
  corresponding update methods. Their update methods
  acceps the time and keys arguments as well as the
  state's *this* value.
*/

State.prototype.update = function(time, keys) {
  let actors = this.actors.map(actor => actor.update(time, this, keys));
  let newState = new State(this.level, actors, this.status);

  if (newState.status != 'playing') return newState;

  let player = newState.player;
  if (this.level.touches(player.pos, player.size, 'lava')) {
    return new State(this.level, actors, 'lost');
  }

  for (let actor of actors) {
    if (actor != player && overlap(actor, player)) {
      newState = actor.collide(newState);
    }
  }
  return newState;
};

export default State;
