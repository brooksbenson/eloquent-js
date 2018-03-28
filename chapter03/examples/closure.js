/*
  An example of a closure
*/

const sayHiTo = (name) => (greeting) => `Hello, ${name}. ${greeting}`;

const sayHiToBob = sayHiTo('Bob');
const sayHiToRachel = sayHiTo('Rachel');

sayHiToBob(`You're fantastic.`); // Hello, Bob. You're fantastic.
sayHiToRachel(`You're a charm.`) //Hello, Rachel. You're a charm.