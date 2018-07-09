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
