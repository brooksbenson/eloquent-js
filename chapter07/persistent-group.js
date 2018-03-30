/*
  Persistent Group

  Write a new class called PGroup that stores a set of values.
  It should have the methods add, delete, and has.

  Its add and delete methods should return a new PGroup
  instead of modifying the PGroup that the methods are called
  from.

  The class should work with keys from any type, not just strings.
*/

class PGroup {
  constructor(val) {
    this.group = val;
  }

  add(val) {
    if (!this.has(val)) return this;
    return new PGroup(this.group.concat(val));
  }
  delete(val) {
    if (!this.has(val)) return this;
    return new PGroup(this.group.filter(x => x != val));
  }
  has(val) {
    return this.group.includes(val);
  }
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// true
console.log(a.has("b"));
// false
console.log(b.has("a"));
// false