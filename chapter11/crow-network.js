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
  })
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

function sendGossip(nest, message, exceptFor) {
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