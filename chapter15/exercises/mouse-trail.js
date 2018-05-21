/*
  Create a mouse trail.

  When the mouse moves, a trail of elements should
  follow behind it.

  On a mouse move event, the event object contains
  clientX and clientY properties that denote the
  coordinates of the mouse.

  It makes sense to store the mouse trail in an array.
  The array will store nodes. Whenever the event handler
  fires, a new node will be added to the array and inserted
  into the document. When the array is a certain length,
  the event handler will remove the last node from the DOM
  and the array.
*/

const mouseTrail = [];

function addTrail(x, y) {
  const node = document.createElement('div');
  node.className = 'trail';
  node.style.top = y - 3 + 'px';
  node.style.left = x - 3 + 'px';
  document.body.appendChild(node);
  mouseTrail.unshift(node);
}

function removeTrail() {
  const node = mouseTrail.pop();
  node.remove();
}

document.body.addEventListener('mousemove', ({ clientX, clientY }) => {
  if (mouseTrail.length < 10) {
    addTrail(clientX, clientY);
  } else {
    addTrail(clientX, clientY);
    removeTrail();
  }
});
