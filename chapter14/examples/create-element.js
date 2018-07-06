/*
  elt is a function that creates an element
  DOM node. The type is specified by the first
  parameter, and the rest of the arguments are
  added as children to the newly created element.
*/

function elt(type, ...children) {
  const node = document.createElement(type);
  for (let child of children) {
    typeof child == 'string'
      ? node.appendChild(document.createTextNode(child))
      : node.appendChild(child);
  }
  return node;
}
