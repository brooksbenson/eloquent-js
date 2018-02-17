/*
  Write a function arrayToList that takes an array and builds
  up a list.

  Write a function listToArray that takes a list structure
  and produces an array.

  Write a helper function called prepend that takes an element
  and a list and creates a new list that adds the element to the
  front of the input list.

  Write a helper function nth that takes a list and a number and
  returns the element located at that position in the list
*/

const prepend = (rest, value) => ({ value, rest });
const nth = ({rest, value}, pos, i = 1) => i === pos ? value : nth(rest, pos, ++i);

function arrayToList(arr) {
  let list = null;
  arr.reverse().forEach(x => {
    list = {
      value: x,
      rest: list
    }
  });
  return list;
}

function listToArray({rest, value}, arr = []) {
  return rest === null
    ? [...arr, value]
    : listToArray(rest, [...arr, value])
}

const list = arrayToList([...'abc']);