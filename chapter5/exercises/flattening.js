//write a function that takes a multi dimensional array
//and flattens it to a single dimensional array with all the
//values that were once contained in the nested array

function flatten(arr) {
  let res = [];
  for (let e of arr) {
    Array.isArray(e)
      ? res.push(...flatten(e))
      : res.push(e);
  }
  return res;
}