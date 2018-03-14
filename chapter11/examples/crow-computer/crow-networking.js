/*
  Crows and a type of insect have formed a symbiotic
  relationship where the crow provides food and the
  insect runs an organic computer that sends, receives,
  and stores data.

  The computer is composed of bulbous clay structures
  that serve as points that work with data. These
  points are networked to where some have clear lines
  of sight with others, and through these lines of sight
  they communicate with one another by relecting light.

  Each node in the network uses a storage bulb to store
  and retrieve data. This interface takes time to work
  with, so our actions with them need be asynchronous
  and use callbacks. The bulbs store JSON-encodable
  data under names. A crow may store places where it
  has hidden food under the name "food caches", which
  could hold an array of names that points to other pieces
  of data, describing the actual cache.
*/

const {bigOak} = require('./crow-tech');
bigOak.readStorage('food caches', ([firstCache]) => {
  bigOak.readStorage(firstCache, info => {
    console.log(26, info);
  });
});

/*
  Crow nest computers are built to communicate through
  request-response pairs. 
  
  Each request is tagged with a type that is used to 
  field the request to its corresponding handler.

  Each node has a send method that takes the following
  arguments, respectively: destination, request type,
  request content, and a callback that is fired once
  a response is received.
*/

bigOak.send('Cow Pasture', 'note', 'caw loudly at 7', () => {
  console.log(50, 'Note delivered');
});

/*
  Sometimes, new types of requests need to be introduced
  to the network. The crow-tech module provides a function
  for defining new requests types and their handlers.

  The handler is passed the following arguments, respectively:
  nest (obj | the receiving nest), content (any | the value from the sender),
  source (str | the sending nest), done (function | concludes the handler and
  sends a value back to the sender).

  If our handler used its return value as the response,
  it would not be able to make asynchronous actions.
  This is due to the fact that a function will
  usually return before an asynchronous action concludes.

  This highlights the fact that any function that makes use
  of a function that is asynchronous must itself be asynchronous.
*/

const {defineRequestType} = require('./crow-tech');
defineRequestType('alert', (nest, content, source, done) => {
  console.log(`\n\nALERT FROM ${source.toUpperCase()}: `, content, '\n\n');
  done('Alert was received');
});

bigOak.send('Cow Pasture', 'alert', 'The termites are revolting', (res) => {
  console.log(res);
});