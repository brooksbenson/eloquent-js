/*
  Write a function, deepEqual, that takes two values and returns true
  only if they are the same values or are objects with the same properties,
  where the values of the properties are equal.
*/

const obj1 = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: {
    d: 'd'
  }
};

const obj2 = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: {
    d: 'd'
  }
};

const obj3 = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: {
    d: 'd'
  },
  e: 'e'
};

const obj4 = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: {
    d: 'c'
  }
};

function deepEqual(a, b) {
  if (a === b) return true;

  if (!(a instanceof Object) ||
      !(b instanceof Object)) return false;

  if (Object.keys(a).length !== 
      Object.keys(b).length) return false;
  
  return Object.keys(a).every(x => {
    if (!b.hasOwnProperty(x)) return false;
    return deepEqual(a[x], b[x]);
  });
}