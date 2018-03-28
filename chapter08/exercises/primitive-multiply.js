/*
  Say you have a function that, 20% of the time, reliably
  multiplies 2 numbers, and the other 80% raises an exception.
  
  Write a function that keeps running the function until it
  succeeds in multiplying two numbers.
*/

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure('Klunk');
  }
}

function reliableMultiply(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (e) {
      if (!e instanceof MultiplicatorUnitFailure) {
        throw e;
      }
    }
  }
}

console.log(reliableMultiply(null, 8));