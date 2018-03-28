/*
  The point of reachingN is to figure out how to reach a given number
  by starting at the number 1 and then repeatedly applying one of two
  operations to it: adding by 5 or multiplying by 3, then taking the
  product and applying either of the two operations again. 

  Within reachingNs body another function, reach, is defined.
  reach defines two parameters, current and history.
  current is a number and a product of the previous operation.
  history is a string used to represent the history of operations that
  have been applied to 1 in order to reach current.

  If the target has been reached by current, the history is returned.
  If the target has been exceeded by current, then null is returned.
  Either of these two return values will resolve the call stack to a certain
  point, allowing the program to begin testing another branch of operations.

  If the target cannot be reached, the program will return null.
*/

function reachingN(target) {
  function reach(current, history) {
    if (current === target) {
      return history;
    } else if (current > target) {
      return null;
    } else {
      return reach(current * 3, `(${history} * 3)`) ||
             reach(current + 5, `(${history} + 5)`);
    }
  }
  return reach(1, '1');
}