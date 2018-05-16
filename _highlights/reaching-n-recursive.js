/*
  The point of reachingN is to figure out how to reach a given number
  by starting at the number one and then repeatedly applying one of two
  operations to it: adding by five or multiplying by three, then taking the
  product and applying either of the two operations again. 

  Within reachingN's body another function, reach, is defined.
  reach defines two parameters, current and history.
  current is a number and a product of the previous operation.
  history is a string used to represent the history of operations that
  have been applied to one in order to reach current.

  If the value of target is the value of current the history is returned.
  If the value of current exceeds the value of target then null is returned.

  If the target cannot be reached, the program will return null.
*/

function reachingN(target) {
  function reach(current, history) {
    if (current === target) {
      return history;
    } else if (current > target) {
      return null;
    } else {
      return (
        reach(current * 3, `(${history} * 3)`) ||
        reach(current + 5, `(${history} + 5)`)
      );
    }
  }
  return reach(1, '1');
}
