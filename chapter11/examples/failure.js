const logHelper = require('./logging-helper');

/*
  Asynchronous computations may fail. A network
  request can fail or some code that is part of
  the asynchronous computation may throw an
  exception.

  One issue of the callback style of asynchronous
  programming is properly reporting errors to the
  callbacks. One convention is to define the first
  parameter of the callback as an error and the
  second as the produced value.

  Promises make handling issues in asynchronous
  computations easier because they can be rejected.
  When a promise is rejected, the resolve handlers
  assigned to it via .then aren't executed, and the
  promises they return are rejected. 
  
  Much like how resolving a promise produces a value, 
  rejecting a promise produces a value as well. This value
  is called the *reason* for rejection, and can
  populate due to an exception or because a promise
  was denoted as rejected. Any element in the promise
  chain created by .then will propogate the rejected
  promise and its reason through the promise chain.

  .then accepts a rejection handler as its second
  argument that receives the reason for rejection
  as its argument.
*/

let rejectedPromise = Promise.reject('reason');
rejectedPromise.then(
  result => console.log(result),
  reason => logHelper('Rejected promise example', reason) //reason
);

/*
  Promises expose a .catch method that is used to
  handle rejected promises much like how .then is
  used to handle resolved ones. .catch receives the
  reason for rejection as its first argument and
  it returns a promise that immediately resolves
  with the return value of the handler.
*/


Promise.reject('reason')
  .catch(reason => 'its all good')
  .then(result => logHelper('Handled rejection', result));

/*
  Occasionally, the requests being transmitted from
  nest to nest fail. This can be because there isn't
  enough light or because of an interference. To deal
  with this, we will create a request function that
  wraps the send method in a promise. The function
  will attempt to make a request multiple times 
  before it rejects, and when it receives confirmation,
  it will resolve.
*/

class Timeout extends Error {}

function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n) {
      nest.send(target, type, content, (failed, value) => {
        done = true;
        failed 
          ? reject(failed) 
          : resolve(value);
      });
      setTimeout(() => {
        if (done) return;
        n < 3 
          ? attempt(n + 1)
          : reject(new Timeout('Timed out'));
      });
    }
    attempt(1);
  });
}