/*
  Write a range function that takes a start and an end
  as the first and seconds arguments, respectively, and
  returns an array that contains all the numbers between
  start and end, both being inclusive.

  Write a function called sum that takes an array of numbers
  and returns the sum of those numbers.

  As a bonus, defined a third parameter of range that indicates
  how each number should increment or decrement from the previous
  number in the range.
*/

function range(start, end, step = 1) {
  let loopStart = Math.min(start, end);
  let loopEnd = Math.max(start, end);
  let loopStep = Math.abs(step);
  let res = [];
  for (let x = loopStart; x <= loopEnd; x += loopStep) {
    res.push(x);
  }
  return start > end
    ? res.reverse()
    : res; 
}

const sum = a => a.reduce((sum, x) => sum += x);
console.log(sum(range(10, 1)));