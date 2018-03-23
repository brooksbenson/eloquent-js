const logHelper = require('./logging-helper');

/*
  A promise is an asynchronous action that may
  complete at some time and produce a value.

  The easiest way to create a promise is with
  the Promise.resolve method. It wraps the
  provided value in a promise that immediately
  finishes with that value. If it is passed a
  promise, it just returns that promise.

  To use the result of a promise, you assign
  it a callback function using the .then method.
  This function is passed the results of the
  promise once it finishes and produces a value.
*/

/*
  It is possible to assign multiple callbacks to
  the results of a promise using the .then method
  as demonstrated below.
*/

let fifteen = Promise.resolve(15);
fifteen.then(n => logHelper('Fifteen cb#1', n)); //15
fifteen.then(n => logHelper('Fifteen cb#2', n + 1)); //16

/*
  The .then method also returns a new promise that
  immediately resolves with the value that its callback
  returns. If that value is promise, it waits for that
  promise and then resolves to its results.
*/

let sixteen = Promise.resolve(15).then(n => n + 1);
sixteen.then(n => logHelper('Sixteen cb#1', n)); //16

let seventeen = sixteen.then(n => Promise.resolve(n + 1));
seventeen.then(n => logHelper('Seventeen cb#1', n)); //17

/*
  To create a promise, you can use the Promise
  constructor. It expects a function as an
  argument, which it will pass a resolving
  function that, when called, resolves the
  promise with the value it was provided.
*/

let promise = new Promise(resolve => {
  setTimeout(() => resolve('promise resolved'), 1000);
});

promise.then(result => logHelper('promise with constructor', result));


//A promise-based interface for the readStorage function
function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result));
  });
}

/*
  The main advantage of promises is that they
  simplify the use of asynchronous functions.
  Instead of passing around callbacks, promise-based
  functions look similar to regular functions--
  the only difference being that their values
  may not be available yet.
*/