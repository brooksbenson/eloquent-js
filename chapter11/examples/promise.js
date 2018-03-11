/*
  The easiest way to create a promise is with Promise.resolve.
  This function ensures that the value you give it is wrapped
  with a promise. If the argument value is already a promise
  it is simply returned, and if it is another type then you
  get a new promise that immediately finishes with your value
  as its result.
*/

let fifteen = Promise.resolve(15);
//To get the result of a promise, you pass a callback function
//to its .then method. The function will be called when the
//promise resolves and produces a value
fifteen.then(value => console.log('Got value', value));
//The then method returns another promise which resolves
//to the value produced by the handler function or, if
//the handler returns a promise, waits for that promise
//and then resolves to its result

/*
  You can create a promise by using the promise
  constructor. It defines a function as a parameter,
  which it immediately invokes and passes a resolve
  function to, which, when called with a produced
  value from an asynchronous call, resolves the
  promise with that value.
*/

function networkRequest(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`You called network request with >${val}<`), 2000);
  });
}

networkRequest('this guy :D').then(res => {
  console.log(res);
});

/*
  If a promise is rejected, or if any piece of asynchronous
  code raises an exception, the chain of asynchronous code
  is wholly rejected.

  Much like how a resolving promise provides a value, a
  rejecting one also provides a value. This value is called
  the *reason* of the rejection. When an exception value
  in a handling function causes the rejection, the exception
  value is used as the reason.

  To explicitly handle rejected promises, a callback needs
  to be registered by the .catch method. The registered 
  callback function is called with the reason for the 
  rejection
*/