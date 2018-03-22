const logHelper = require('./logging-helper');

/*
  A function that is passed to a function that takes a 
  long running action to handle the results of that
  action is called a callback function.

  The setTimout function available in both Browsers and
  Node.js accepts a callback function that it calls after
  a certain number of milliseconds.
*/

function oneSecond() {
  let start = new Date().getTime();
  setTimeout(() => {
    logHelper('Set Timout Example', new Date().getTime() - start);
  }, 1000);
}

oneSecond(); //1007

/*
  Doing multiple asynchronous actions in a row
  using callbacks means that each callback has
  to nest another callback, creating multiple
  levels of indentation.
*/

/*
  In our crow example, each nest in the network
  uses a long-term storage bulb. This storage
  bulb stores pieces of JSON-encoded data under
  names. A crow may store a list of places it has
  stored food under the name "food caches", and each
  list item under "food caches" points to another
  chunk of data in the storage bulb that explains
  further about the food cache.
*/

const { bigOak } = require('./crow-tech');
bigOak.readStorage('food caches', caches => {
  let [ firstCache ] = caches;
  bigOak.readStorage(firstCache, info => {
    logHelper('Food Cache Example', info);
  });
});

/*
  Each nest in the network exposes a send method
  for sending requests to other nests. For a request
  to be received properly it needs to be tagged with
  a type so that the receiving nest knows which code
  to run to handle the request. Requests are always
  followed up by a response. The response can simply
  serve as a confirmation of reception or can contain
  information pertaining to the request.

  The send method exposed by nests defined 4 parameters:
  1) The name of the receiving nest (string)
  2) The type of request (string)
  3) The content of the request (any)
  4) A callback function to run once a response has been received
*/

bigOak.send('Cow Pasture', 'note', 'foo bar', () => {
  logHelper('Send To Cow Pasture Example', 'Message received by Cow Pasture');
});

/*
  To make a nest capable of receiving a new type of
  request, we have to define the request type. The
  defineRequestType function defines a string that
  names the request type as the first parameter, and
  a callback that executes when a nest receives that
  type of request.

  The callback function defines four parameters:
  1) The receiving nest (object)
  2) The content (Any)
  3) The name of the sending nest (str)
  4) A function that, when invoked, concludes the handler
     and sends the data it was passed back to the sender
*/

const { defineRequestType } = require('./crow-tech');
defineRequestType('alert', (nest, content, source, done) => {
  let alert = `${nest.name.toUpperCase()} received ${content} from ${source}`;
  logHelper('Alert Request', alert);
  done(); 
});

bigOak.send('Cow Pasture', 'alert', 'Kids with airguns coming your way', () => {});