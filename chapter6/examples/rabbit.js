function speak(line) {
  return `The ${this.type} rabbit says '${line}'.`
};

let fatRabbit = {
  type: 'fat'
};

speak.call(fatRabbit, `I'm hungry`); //The fat rabbit says 'I'm hungry'.

function normalize() {
  return this.coords.map(n => n / this.length);
}

normalize.call({ coords: [0, 2, 3], length: 5 });

// prototypes

let empty = {};
empty.toString; //function
empty.toString(); //[object Object]

//it looks like the code above is retrieving the value
//of a property that doesn't exist, but the property does
//exist. It exists in the empty objects prototype.

let protoRabbit = {
  speak(line) {
    return `The ${this.type} rabbit says '${line}'.`
  }
}

//used to create an object with a specific prototype
let killerRabbit = Object.create(protoRabbit); 
killerRabbit.type = 'killer';
killerRabbit.speak('SKREEEE');

class Rabbit {
  constructor(type) {
    this.type = type;
  }

  get type() {
    return this.type;
  }
  set type(value) {
    this.type = value;
  }
  speak() {
    console.log(`The ${this.type} rabbit says '${line}'.`);
  }
}