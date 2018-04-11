// generators return an iterator
function* text(str) {
  for (let c of str) {
    // yield statements pause the generator &
    // are equivelant to calling next where the
    // returned value is equal to yielded value
    // and the done property is false
    yield c;
  }
  // return statement cause the iterator to
  // terminate with the returned value
  return str;
}

let textIterator = text('abc');
for (let i = 0; i < 4; i++) {
  let next = textIterator.next();
  console.log(next);
  // { value: 'a', done: false }
  // { value: 'b', done: false }
  // { value: 'c', done: false }
  // { value: 'abc', done: true }
}