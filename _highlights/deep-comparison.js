/*
  Write a function, deepEqual, that receives two values and returns true
  if they are the same value or are objects with the same key value pairs.
*/

function deepEqual(a, b) {
  if (a === b) return true;

  if (!(a instanceof Object) || !(b instanceof Object)) return false;

  if (Object.keys(a).length !== Object.keys(b).length) return false;

  return Object.keys(a).every(x => {
    if (!b.hasOwnProperty(x)) return false;
    return deepEqual(a[x], b[x]);
  });
}
