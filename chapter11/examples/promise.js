/*
  Instead of arranging for a callback to execute
  when an asynchronous action concludes, you can
  use an object to denote that future event and
  immediately return it. This is what the class
  Promise is for.

  A promise denotes an asynchronous action that
  may complete at some point and produce a value.
  It is able to notify anyone that is interested
  when its value is available.

  The easiest way to create a promise is with the
  Promise.resolve static method. (As a refresher,
  a static method is a method that is directly
  apart of a class, that is, part of the class
  but not part of its instances).

  The resolve method takes a value and wraps it in
  a promise. If it is passed a promise that promise
  is simply returned, otherwise you get a new promise
  that immidiately finishes with the value that was
  passed
*/

let fifteen = Promise.resolve(15);
fifteen.then(n => console.log('fifteen resolved with:', n)); //Resolved with 15

/*
  Promise instances have a then method that registers
  a callback that executes when the promise resolves 
  and produces a value. When the callback is executed
  its return value is wrapped in a promise and returned,
  but if the return value is a promise then it returns
  that promise.
*/

let twelve = Promise.resolve(12);
let thirteen = twelve.then(n => n + 1);
thirteen.then(n => console.log(`thirteen resolved with:`, n));

/*
  The Promise constructor expects a function value as its
  first argument, which it will immediately invoke with
  another function value called the *resolving* function.
  The resolving function is eventually passed the result
  of some asynchronous action which will cause the promise
  to resolve!
*/

let waitASecond = new Promise(resolve => {
  setTimeout(() => resolve('It\'s been a second'), 1000);
});
waitASecond.then((value => console.log('waitASecond resolved with:', value)));

/*
  Promise instances need a way to handle errors raised by
  asynchronous processes. The function value passed to the
  promise constructor will be passed a function value that
  *rejects* the promise as its second argument. This value
  passed to the rejecting function is called the *reason* of
  the rejection. Another way to cause a rejection is if a
  handler function raises an exception.

  A rejected promise behaves similarly to an exception that
  unwinds the call stack; every handler defined with the
  .then on a given promise will reject and pass along the
  reason for the rejection.
*/

let rejectedPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject('reason'), 1000);
});

rejectedPromise
  .then(val => console.log(`Succeeded with ${val}`)) //does not execute
  .catch(err => console.log(`Failed with a ${err}`));

let exceptionPromise = new Promise(() => {
  throw new Error();
});

exceptionPromise //executes handler with an Error
  .catch((err) => console.log(`Exception promise failed with: ${err}`));


/*
  When working with collections of promises running at the
  same time, the Promise.all static method is useful. It
  takes a list of promises stored inside an array as its
  only argument, and returns a promise that waits for every
  single one of those promises to resolve. If any of those
  promises are rejected, the result of Promise.all is rejected.
  If they all resolve, then Promise.all returns an array of values
  that those promises produced, in the corresponding that promises
  were passed in.
*/