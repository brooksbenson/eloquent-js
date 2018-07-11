import { elt, Vec } from './utils';
import { scale } from './globals';

class DOMDisplay {
  constructor(parent, level) {
    this.dom = elt('div', { class: 'game' }, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  clear() {
    this.dom.remove();
  }
}

/*
  The grid is defined once upon level initializtion.
  Nothing about the grid changes during the game.

  The level object has a rows property whose value is an
  array of arrays. Each row is derived from a single
  array, whose values are used to assign class names to
  grid points.
*/

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

/*
  The actors of the game are given their own
  layer, which is placed on top of the grid.

  As stated before, we are using vectors to
  define the size, position, and speed of the
  actors. Vectors are objects composed of x
  and y properties.
*/

function drawActors(actors) {
  return elt(
    'div',
    {},
    ...actors.map(actor => {
      let rect = elt('div', { class: `actor ${actor.type}` });
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.pos.y * scale}px`;
      return rect;
    })
  );
}

/*
  The syncState method makes changes to the
  DOMdisplay object. It first removes the actor
  layer, then recalculates it and appends it to
  the dom. It takes the status value from state
  and then assigns it as a className to the root
  game node, then it scrolls the player into view.
*/

DOMDisplay.prototype.syncState = function(state) {
  if (this.actorLayer) this.actorLayer.remove();
  this.actorLayer = drawActors(state.actors);
  this.dom.appendChild(this.actorLayer);
  this.dom.className = 'game ' + state.status;
  this.scrollPlayerIntoView(state);
};

/*
  A given level may protrude outside
  of the game viewport. To make sure
  we adjust the viewport according
  to the player position, we define
  the scrollPlayerIntoView method.
  
*/

DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
  let width = this.dom.clientWidth;
  let height = this.dom.clientHeight;
  let margin = width / 3;

  // The viewport
  let left = this.dom.scrollLeft;
  let right = left + width;
  let top = this.dom.scrollTop;
  let bottom = top + height;

  /*
    To find the players center we take the position of its
    top left corner and then add its width and height both
    divided by two, then multiply this new vector by the
    the number of pixels that take up a grid unit (20px).
    This figure is the center of our avatar within the game
    viewport.
  */

  let player = state.player;
  let center = player.pos.plus(player.size.times(0.5)).times(scale);

  /*
    Next follows a series of checks to make sure the avatar
    is within a neutral center. If the avatar ever leaves the
    center, we adjust the scroll position of the viewport
    accordingly.
  */

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

export default DOMDisplay;
