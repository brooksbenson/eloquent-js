class Level {
  constructor(plan) {
    const rows = plan
      .trim()
      .split('\n')
      .map(l => [...l]);
    this.height = rows.length;
    this.width = rows[0].length;
    this.actors = []; // moving elements

    this.rows = rows.map((row, y) => {
      return row.map((char, x) => {
        const type = levelChars[char];
        if (typeof type == 'string') return type;
        this.actors.push(type.create(new Vec(x, y), char));
        return 'empty';
      });
    });
  }
}

Level.prototype.touches = function(pos, size, type) {
  const xStart = Math.floor(pos.x);
  const xEnd = Math.ceil(pos.x + size.x);
  const yStart = Math.floor(pos.y);
  const yEnd = Math.ceil(pos.y + size.y);

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      const isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
      const here = isOutside ? 'wall' : this.rows[y][x];
      if (here == type) return true;
    }
  }
  return false;
};

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

State.prototype.update = function(time, keys) {
  const actors = this.actors.map(actor => actor.update(time, this, keys));
  let newState = new State(this.level, actors, this.status);
  if (newState.status != 'playing') return newState;
  const { player } = newState;
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

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}

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
    switch (ch) {
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
    const basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}

Coin.prototype.size = new Vec(0.6, 0.6);

const levelChars = {
  '.': 'empty',
  '#': 'wall',
  '+': 'lava',
  '@': Player,
  '=': Lava,
  '|': Lava,
  v: Lava,
  o: Coin
};

function elt(name, attrs, ...children) {
  const dom = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }
  return dom;
}

class DOMdisplay {
  constructor(parent, level) {
    this.dom = elt('div', { class: 'game' }, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  clear() {
    this.dom.remove();
  }
}

const scale = 20;

DOMdisplay.prototype.setState = function(state) {
  if (this.actorLayer) this.actorLayer.remove();
  this.actorLayer = drawActors(state.actors);
  this.dom.appendChild(this.actorLayer);
  this.dom.className = `game ${state.status}`;
  this.scrollPlayerIntoView(state);
};

DOMdisplay.prototype.scrollPlayerIntoView = function(state) {
  const width = this.dom.clientWidth;
  const height = this.dom.clientHeight;
  const margin = width / 3;

  // Viewport
  const left = this.dom.scrollLeft;
  const right = left + width;
  const top = this.dom.scrollTop;
  const bottom = top + height;

  const player = state.player;
  const center = player.pos.plus(player.size.times(0.5)).times(scale);

  if (center.x < left + margin) {
    this.dom.scrollLeft = center.x - margin;
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width;
  }
  if (center.y < top + margin) {
    this.dom.scrollTop = center.y - margin;
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height;
  }
};

function drawGrid(level) {
  return elt(
    'table',
    {
      class: 'background',
      style: `width: ${level.width * scale}px`
    },
    ...level.rows.map(row =>
      elt(
        'tr',
        { style: `height: ${scale}px` },
        ...row.map(type => elt('td', { class: type }))
      )
    )
  );
}

function drawActors(actors) {
  return elt(
    'div',
    {},
    ...actors.map(actor => {
      const rec = elt('div', { class: `actor ${actor.type}` });
      rec.style.width = `${actor.size.x * scale}px`;
      rec.style.height = `${actor.size.y * scale}px`;
      rec.style.left = `${actor.pos.x * scale}px`;
      rec.style.top = `${actor.pos.y * scale}px`;
      return rec;
    })
  );
}