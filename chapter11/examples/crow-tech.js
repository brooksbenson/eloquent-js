/*
  Crows have formed a symbiotic relationship with a type
  of bug that creates networks of bulbous clay structures
  that encode and send data. We'll call these clay structures
  nests. Nests send data back and forth by using light and
  reflection, and not all nests have a clear site of one
  another. If a nest wants information from another nest that
  it doesn't have a clear line of sight with, then it must communicate
  with another nest that does. The following programs are
  networking functions that helps crows communicate through
  nests.
*/

{
  //Nests have a readStorage function
  import {bigOak} from './crow-tech';
  bigOak.readStorage('food caches', caches => {
    let firstCache = caches[0];
    bigOak.readStorage(firstCache, info => {
      console.log(info);
    });
  });

  //Nests have a send method
  //location, type, content, callback
  bigOak.send('Cow Pasture', 'note', 'let\'s caw loudly at sundown', () => {
    console.log('Note delivered');
  });

  //To make nests capable of handling note requests
  //we have to define that type of handler
  import {defineHandler} from './crow-tech';
  defineHandler('note', (nest, content, source, done) => {
    console.log(`${nest.name} received note: ${content}`);
    done();
  });

  //The done argument is a value that concludes the handling
  //process. If handlers were designed to where their response
  //value was their return value, that would mean the handler could
  //not perform asychronous actions. This is because the handler
  //would return BEFORE the asynchronous actions were complete.
}

{
  //Promises

  function storage(nest, name) {
    return new Promise(resolve => {
      nest.readStorage(name, result => resolve(result));
    });
  }

  storage('Cow Pasture', 'Food caches')
    .then(result => console.log('Got this back: ', result));

  class Timeout extends Error {}

  function request(nest, target, type, content) {
    return new Promise((resolve, reject) => {
      let done = false;
      function attempt(n) {
        nest.send(target, type, content, (failed, value) => {
          done = true;
          failed ? reject(value) : resolve(value);
        });
        setTimeout(() => {
          if (done) return;
          else if (n < 3) attempt(n + 1);
          else reject(new Timeout('Timed out'));
        }, 250);
      }
    attempt(1);
    });
  }

  function requestType(name, handler) {
    defineHandler(name, (nest, content, source, callback => {
      try {
        Promise.resolve(handler(nest, content, source))
          .then(
            response => callback(null, response),
            failure => callback(failure)
          )
      } catch (exception) {
        callback(exception);
      }
    }));
  }
}