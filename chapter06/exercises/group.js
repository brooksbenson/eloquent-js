/*
  Write a class called Group that defines add,
  delete, and has methods. Add should add
  a value to the group only if the value
  doesn't already exist, delete should
  remove a value from the group, and has
  should return a boolean stating whether
  or not the value exists in the group.
  
  Give the class a static method called
  from that defines an iterable object as
  a parameter and creates a new group that
  contains all the value produced by iterating
  over it. 
*/

class Group {
  constructor() {
    this.contents = [];
  }

  add(value) {
    if (!this.contents.includes(value)) {
      this.contents.push(value);
    }
  }
  has(value) {
    return this.contents.includes(value);
  }
  delete(value) {
    const valIndex = this.contents.indexOf(value);
    this.contents.splice(valIndex, 1);
  }
  
  static from(obj) {
    let group = new Group();
    for (let value of obj) {
      group.add(value);
    }
    return group;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(group) {
    this.group = group.contents;
    this.index = 0;
  }

  next() {
    if (this.index === this.group.length) {
      return {done: true}
    }
    
    const value = this.group[this.index]; 
    this.index++;
    return {value, done: false};
  }
}