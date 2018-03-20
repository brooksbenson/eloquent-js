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

/*
  When a node wants to talk to a single other node,
  flooding is not a very efficient approach. An
  alternative way is to setup a way for a message
  to move from node to node until it reaches its
  destination.

  If a node wants to communicate with a far away node,
  it needs to know which of its neighbors gets it closer.
  This requires a knowledge of the layout of the network.

  Since each node only knows about its direct neighbors,
  we aren't able to compute a route. We need spread the
  layout information to all nests, preferable in a way
  that allows it to change over time when nests are 
  abandoned or new nests are built.
*/

requestType('connections', (nest, {name, neighbors}, source) => {
  let {connections} = nest.state;
  if (JSON.stringify(connections.get(name)) ==
      JSON.stringify(neighbors)) return;

  connections.set(name, neighbors);
  broadcastConnections(nest, name, source);
});

function broadcastConnections(nest, name, exceptFor = null) {
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, 'connections', {
      name,
      neighbors: nest.state.connections.get(name)
    });
  }
}

everywhere(nest => {
  nest.state.connections = new Map;
  nest.state.connections.set(nest.name, nest.neighbors);
  broadcastConnections(nest, nest.name);
});

/*
  The functionality above provides the network layout
  to every single node in the network as a graph, and 
  graphs can be used to create routes. If we have a
  route towards a messages destination, we know in
  which direction to send it.
*/

function findRoute(a, b, connections) {
  let work = [{at: a, via: null}];
  for (let i = 0; i < work.length; i++) {
    let {at, via} = work[i];
    for (let next of connections.get(at) || []) {
      if (next == b) return via;
      if (!work.some(w => w.at != at)) {
        work.push({at: next, via: via || next});
      }
    }
  }
  return null;
}

/*
  The findRoute function takes node a, node b,
  and the network graph, then returns the first 
  route it identifies from point a to point b.
  
  To do this, it keeps a work list where each
  element denotes a node to explore. The function
  kicks off by looking at the nodes available from
  the starting point, then pushes the node into the
  work load if it is not already present.

  When a node in the work list is examined and 
  our function identifies that it is connected
  to node b, our destination, then it returns
  the route that is associated with that node
  in the work list.
*/

/*
  We can not build a function that sends messages
  from one node to another without using flooding.
  If the message is addressed to a direct neighbor
  it is delivered as usual. If not, it is packaged
  in an object and sent to the neighbor closest to
  the recipient using the "route" request type, which
  will cause the neighbor to repeat the same behavior.
*/

function routeRequest(nest, target, type, content) {
  if (nest.neighbors.includes(target)) {
    return request(nest, target, type, content);
  }
  let via = findRoute(nest.name, target, nest.state.connections);
  if (!via) throw new Error(`No route to ${target}`);
  return request(nest, via, 'route', {
    target, type, content
  });
}

requestType('route', (nest, {target, type, content}) => {
  return routeRequest(nest.name, target, type, content);
});

/*
  To protect important information, crows will duplicate
  the information across nodes. That way, if one node is
  destroyed, the information will persist. When a node
  needs a piece of information that it doesn't store
  locally, it can consult other nodes until it finds
  the piece of information it is looking for.
*/

requestType('storage', (nest, name) => storage(nest, name));

function findInStorage(nest, name) {
  return storage(nest, name).then(found => {
    if (found != null) return found;
    else return findInRemoteStorage(nest, name);
  });
}

function network(nest) {
  return Array.from(nest.state.connections.keys());
}

function findInRemoteStorage(nest, name) {
  let sources = network(nest).filter(n => n != nest.name);
  function next() {
    if (sources.length == 0) {
      return Promise.reject(new Error('Not found'));
    } else {
      let source = sources[~~(Math.random() * sources.length)];
      sources = sources.filter(s => s != source);
      return routeRequest(nest, source, 'storage', name)
        .then(value => value != null ? value : next(), next);
    }
  }
  return next();
}

/*
  A function prefixed with the *async* keyword implicitly
  returns a promise, which resolves when the function
  returns something. The keyword *await* can be prefixed
  in front of a promise within an async functions body
  to pause execution at that place and then resume once
  that promise resolves. This syntax allows the creation
  of asynchronous code that looks synchronous
*/

async function findInStorage2(nest, name) {
  let local = await storage(nest, name);
  if (local != null) return local;

  let sources = network(nest).filter(n => n != nest.name);
  while (sources.length > 0) {
    let source = sources[~~(Math.random() * sources.length)];
    sources = sources.filter(s => s != source);
    try {
      let found = await routeRequest(nest, source, 'storage', name);
      if (found != null) return found;
    } catch (_) {}
  }
  throw new Error('Not found');
}