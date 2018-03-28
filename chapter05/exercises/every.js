/*
  Create a function that takes an array and a test function
  as arguments and applies the test function to every value
  in the array. If the test function returns false at any point
  the function will return false, and will return true if every
  value in the array passes the test
*/

function every(arr, test) {
  for (let x of arr) {
    if (!test(x)) return false;
  }
  return true;
}