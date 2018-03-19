/*
  Crows and a type of insect have formed a symbiotic
  relationship where the crow provides food and the
  insect runs an organic computer that sends, receives,
  and stores data.

  The computer is composed of bulbous clay structures
  that serve as points that work with data. These
  points are networked to where some have clear lines
  of sight with others, and through these lines of sight
  they communicate by relecting light.

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
    // console.log(26, info);
  });
});

/*
  To avoid having to nest callbacks within one another
  we can define a function that wraps readStorage in a
  neat promise based interface. It will take an object
  denoting a particular nest and a name underwhich we
  want data for.
*/

function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result));
  });
}

let enemies = storage(bigOak, 'enemies');
enemies.then(enemies => console.log("\nENEMIES OF BIG OAK:\n\n", enemies, "\n\n"));

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
  Sometimes, new types of requests need to be defined in
  the network. The crow-tech module provides a function for
  defining new types of requests and how they are handled.

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

/*
  As it turns out, communications across the network
  can fail. This can be due to, for instance,
  
  To solve this, we are going to set up a function that
  attempts a request a few times before terminating. The
  function is going to return a promise so that determining
  the success or failure of our request will be easier.
*/

//if our request takes too long
class Timeout extends Error {}

function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
     let done = false;
     function attempt(n) {
       nest.send(target, type, content, (failed, value) => {
         done = true;
         if (failed) reject(failed);
         else resolve(value);
       });
       setTimeout(() => {
         if (done) return;
         else if (n < 3) return attempt(n + 1);
         else reject(new Timeout());
       }, 250)
     }
  });
}

/*
  The attempt function tries to make a single send
  request. It also sets a timeout so that if the
  response doesn't come back within 250 milliseconds,
  it attempts to make another request, and if the attempted
  request is the third, the promise rejects with a Timeout
  error.
*/

function requestType(name, handler) {
  defineRequestType(name, (nest, content, source, done) => {
    try {
      Promise.resolve(handler(nest, content, source))
        .then(response => done(null, response))
        .catch(failure => done(failure));
    } catch (exception) {
      done(exception);
    }
  });
}

/*
  Each nest computer stores a list of neighboring
  nest computers within its line of sight. To see
  which neighbors are currently available, a ping
  request can be defined and used to see which
  neighbors return responses.
*/

requestType('ping', () => 'pong');

function availableNeighbors(nest) {
  let requests = nest.neighbors.map(n => {
    return request(nest, n, 'ping')
      .then(() => true, () => false);
  });
  return Promise.all(requests).then(result => {
    return nest.neighbors.filter((_, i) => result[i]);
  });
}

/*
  Say we need to have a request type that is
  able to send a message to every nest in our
  network. One solution is to set it up to
  where a nest forwars a request on to every
  neighbor, and then those neighbors forward
  the message on to their neighbors, etc. This
  process repeats until every computer in the
  network has received the message.
*/

const {everywhere} = require('./crow-tech');

everywhere(nest => {
  nest.state.gossip = [];
});

function sendGossip(nest, message, exceptFor = null) {
  nest.state.gossip.push(message);
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, 'gossip', message);
  }
}

requestType('gossip', (nest, message, source) => {
  if (nest.state.gossip.includes(message)) return;
  console.log(`${nest.name} received gossip from ${source}`);
  sendGossip(nest, message, source);
});

sendGossip(bigOak, 'Kids with airgun in park');