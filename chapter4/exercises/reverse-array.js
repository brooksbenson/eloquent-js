/*
  Write two functions: reverseArray, reverseArrayInPlace

  reverseArray takes an array as an argument and produces
  a *new* array that has the same elements in the inverse
  order.

  reverseArrayInPlace takes an array and returns the *same*
  array in the inverse order
*/

//reverseArray is a pure function in that it doesn't affect
//the values of any bindings in the environment
function reverseArray(array) {
  let res = [];
  for (let i = array.length - 1; i >= 0; i--) {
    res.push(array[i]);
  }
  return res;
}

//reverseArrayInPlace is a non pure function in that it
//modifies the value passed as an argument (see below)
function reverseArrayInPlace(array) {
  for (let i = 0; i < array.length / 2; i++) {
    let old = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = old;
  }
}

let test = [...'test'];
reverseArrayInPlace(test);
console.log(test); //[ 't', 's', 'e', 't' ]