function time(name, action) {
  const start = Date.now();
  action();
  console.log(`${name} took ${Date.now() - start}ms`);
}

/*
  The action below takes an unnecessary 
  amount of time to complete because
  it reads layout data from the DOM,
  and manipulates the DOM in a loop
  that runs many times.
*/

/*
  <span id="one"></span>
  <span id="two"></span>
*/

time('Naive', () => {
  const target = document.getElementById('one');
  while (target.offsetWidth > 2000) {
    target.appendChild(document.createTextNode('x'));
  }
});
// Naive took 32ms

time('Clever', () => {
  const target = document.getElementById('two');
  target.appendChild(document.createTextNode('x'));
  const length = Math.ceil(2000 / target.offsetWidth);
  target.firstChild.nodeValue = 'x'.repeat(length);
});
// Clever took 1 ms
