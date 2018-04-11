/*
  A scalpel is moved from nest to nest periodically. When
  a transfer occurs, the nests involved store the nest that
  received the scalpel in their storage bulbs under the name
  "scalpel".

  Create a locateScalpel function that follows the breadcrumbs
  until it finds where the scalpel is located.
*/

function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result));
  });
}

function anyStorage(nest, source, name) {
  if (nest.name === source) return storage(nest, name);
  else return routeRequest(nest, source, 'storage', name);
}

async function locateScalpel(nest) {
  let current = nest.name;
  for (;;) {
    let next = await anyStorage(nest, current, "scalpel");
    if (next == current) return current;
    current = next;
  }
}

function locateScalpel2(nest) {
  function loop(current) {
    return anyStorage(nest, current, "scalpel").then(next => {
      if (next == current) return current;
      else return loop(next);
    });
  }
  return loop(nest.name);
}

