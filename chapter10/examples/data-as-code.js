/*
  The problem with evaluating code with the
  global eval function is that it executes
  the code in the *local scope*, which can
  overwrite some of the bindings defined
  there.
*/

const x = 1;
function evalAndReturnX(code) {
  eval(code);
  return x;
}
console.log(evalAndReturnX('var x = 2')); //2

/*
  A better way of evaluating code as string
  data is by using the Function constructor.
  The constructor takes a list of parameters
  separated by commas, and a string that is
  the function body.

  This is the type of pattern needed for a
  proper module system.
*/

let plusOne = Function('n', 'return n + 1');
console.log(plusOne(4)); //5