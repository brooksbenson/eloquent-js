function speak(line) {
  console.log(`The ${this.type} says: ${line}`);
}

const rabbit = new Object();
rabbit.type = 'White';
speak.call(rabbit, 'Shiver me timbers'); //The white rabbit says: Shiver me timbers