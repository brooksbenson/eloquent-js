let sym = new Symbol('sym');
sym == Symbol('sym'); //false
let obj = {
  [sym]: 'sym'
};

const toStringSymbol = new Symbol('toString');
Array.prototype[toStringSymbol] = function() {
  return `${this.length} cm of yarn`;
};
[1, 2].toString(); //1,2
[1, 2][toStringSymbol]; //2 cm of yarn