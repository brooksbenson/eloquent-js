//A promise-based interface for the readStorage function
function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result));
  });
}

class Timeout extends Error {}
//A promise-based interface for nest.send
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


//new interface for defineRequestType
const { defineRequestType } = require('./crow-tech');

function requestType(name, handler) {
  defineRequestType(name, (nest, content, source, done) => {
    try {
      Promise.resolve(handler(nest, content, source))
        .then(result => done(null, result),
              error => done(error));
    } catch (exception) {
      done(exception);
    }
  });
}

//Ping request

requestType('ping', () => 'pong');

function availableNeighbors(nest) {
  let { neighbors } = nest;
  let requests = neighbors.map(neighbor => {
    return request(nest, neighbor, 'ping')
      .then(() => true, () => false);
  });
  return Promise.all(requests).then(result => {
    return neighbors.filter((_, i) => result[i]);
  });
}

//Network Flooding

const { everywhere } = require('./crow-tech');

everywhere(nest => {
  nest.state.gossip = [];
});

function sendGossip(nest, message, exceptFor = null) {
  nest.state.gossip.push(message);
  for (let neighbor of nest.neighbors) {
    if (neighbor === exceptFor) continue;
    request(nest, neighbor, 'gossip', message);
  }
}

requestType('gossip', (nest, message, source) => {
  if (nest.state.gossip.include(message)) return;
  sendGossip(nest, message, source);
});


//Creating and updating the state of nest connections per nest
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

//sending requests to nests that aren't neighbors
function findRoute(from, to, connections) {
  let work = [{at: from, via: null}];
  for (let i = 0; i < work.length; i++) {
    let {at, via} = work[i];
    for (let next of connections.get(at)) {
      if (next == to) return via;
      if (!work.some(w => w.at == next)) {
        work.push({at: next, via: via || next});
      }
    }
  }
  return null;
}

function routeRequest(nest, target, type, content) {
  if (nest.neighbors.includes(target)) {
    return request(nest, target, type, content);
  } else {
    let via = findRoute(nest.name, target, nest.state.connections);
    if (!via) throw new Error(`No route to ${target}`);
    return request(nest, via, 'route', {target, type, content});
  }
}

requestType('route', (nest, {target, type, content}) => {
  return routeRequest(nest, target, type, content);
});

//reading data from other nests
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
    if (sources.length === 0) {
      return Promise.reject(new Error('Not found'));
    } else {
      let source = sources.pop();
      return routeRequest(nest, source, 'storage', name)
        .then(value => value != null ? value : next());
    }
  }
}

//async/await version of findInStorage
async function findInStorage2(nest, name) {
  let local = await storage(nest, name);
  if (local != null) return local;

  let sources = network(nest).filter(n => n != nest.name);
  while (sources.length > 0) {
    let source = sources.pop();
    try {
      let found = await routeRequest(nest, source, 'storage', name);
      if (found != null) return found;
    } catch (_) {}
  }
  throw new Error('not found');
}

// helper
function anyStorage(nest, source, name) {
  if (nest.name === source) return storage(nest, name);
  else return routeRequest(nest, source, 'storage', name);
}

// broken function
async function brokenChicks(nest, year) {
  let list = '';
  await Promise.all(network(nest).map(async name => {
    // list value for every async action is ''
    list += `${name}: ${
      await anyStorage(nest, name, `chicks in year ${year}`)
    }`;
  }));
  // returns list + the result of the *last* promise
  return list;
}

async function chicks(nest, year) {
  const lines = await Promise.all(network(nest).map(async name => {
    return name + `: ${await anyStorage(nest, name, `chicks in ${year}`)}`;
  }));
  return lines.join('\n');
}