const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

/*
  Write a function called withBoxUnlocked that defines
  a function value as a parameter, unlocks the box, then
  assumes the argument passed is in fact a function value,
  and ensures the box is locked again before returning, even
  if an error is thrown.
*/

function withBoxUnlocked(f) {
  try {
    box.unlock();
    f();
  } finally {
    box.lock();
  }
}