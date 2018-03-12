/*
  Crows and a type of insect have formed a symbiotic
  relationship where the crow provides food and the
  insect runs an organic computer that sends, receives,
  and stores data.

  The computer is composed of bulbous clay structures
  that serve as points that store and send data. These
  points are networked to where some have clear lines
  of sight with others, and through these lines of sight
  they communicate with one another by relecting light.

  Each node in the network uses a storage bulb to store
  and retrieve data. This interface takes time to work
  with, so our actions with them need be asynchronous
  and use callbacks. The bulbs store JSON-encodable
  data under names. A crow may store places where it
  has hidden food under the name "food caches", which
  could hold an array of names that point at other pieces
  of data, describing the actual cache.
*/

const {bigOak} = require('./crow-tech');
bigOak.readStorage('food caches', ([firstCache]) => {
  bigOak.readStorage(firstCache, info => {
    console.log(info);
  });
});

/*
  Crow nest computers are built to communicate through
  request-response pairs. That means one nest sends a
  message to another nest, which immidiately sends a
  message back, confirming a receipt and possibly
  including a reply to a question asked in the message.

  Each message is tagged with a type, which determines
  how the request is handled. When a request by a type
  comes in, it is passed to handler that carries out
  the response.

  Each node has a send method that takes the following
  arguments, respectively: 
  a node name, a message type, the message content, 
  and a callback that executes once a response has 
  been returned as arguments, respectively.
*/

bigOak.send('Cow Pasture', 'note', 'caw loudly at 7', () => {
  console.log('Note delivered');
});