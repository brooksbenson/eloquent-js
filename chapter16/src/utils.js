// Positioning

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

// Creating DOM elements

function elt(type, attrs, ...children) {
  const node = document.createElement(type);
  // adding attributes
  for (let attr of Object.keys(attrs)) {
    node.setAttribute(attr, attrs[attr]);
  }
  // appending children
  for (let child of children) {
    node.appendChild(child);
  }
  return node;
}

// Checking whether two actors overlap

function overlap(actor1, actor2) {
  return (
    actor1.pos.x + actor1.size.x > actor2.pos.x &&
    actor1.pos.x < actor2.pos.x + actor2.size.x &&
    actor1.pos.y + actor1.size.y > actor2.pos.y &&
    actor1.pos.y < actor2.pos.y + actor2.size.y
  );
}

export { elt, overlap, Vec };
