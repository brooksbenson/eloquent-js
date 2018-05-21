class Balloon {
  constructor(size = 10, content = '🎈') {
    this.content = content;
    this.size = size;
  }

  ctrl(key) {
    if (key === '+') {
      return Balloon.newState(this.size * 1.1);
    } else if (key === '-') {
      return Balloon.newState(this.size * 0.9);
    } else {
      return this;
    }
  }

  static newState(size) {
    return size > 50 ? new Balloon(size, '🎉') : new Balloon(size, '🎈');
  }
}

const node = document.getElementById('balloon');
let balloon = new Balloon();
window.addEventListener('keypress', e => {
  balloon = balloon.ctrl(e.key);
  node.textContent = balloon.content;
  node.style.fontSize = balloon.size + 'px';
});
