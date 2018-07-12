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
  The update method is used to derive a new state
  based on time steps and actor states. The keys
  argument is a data structure for describing which
  keys are being held down.

  The actors are each updated based on their own
  corresponding update methods. Their update methods
  accept the time and keys arguments as well as the
  state's *this* value. The update method will update
  things like the actors position and its speed based
  on the time step passed as an argument.
*/

State.prototype.update = function(time, keys) {
  let actors = this.actors.map(actor => actor.update(time, this, keys));
  let newState = new State(this.level, actors, this.status);

  if (newState.status != 'playing') return newState;

  let player = newState.player;
  if (this.level.touches(player.pos, player.size, 'lava')) {
    return new State(this.level, actors, 'lost');
  }

  /*
    Every actor, except the player actor, has a collide
    method. The collide method returns a new state if the
    actor overlaps with the avatar. If the actor is lava,
    the state updates its status to "lost". If the actor
    is a coin, the coin is removed as an actor, and if
    there are no more coin actors, the games status is
    updated to "won".
  */

  for (let actor of actors) {
    if (actor != player && overlap(actor, player)) {
      newState = actor.collide(newState);
    }
  }
  return newState;
};

export default State;
