/*
  The function below replaces all images
  in the DOM with the text in their alt
  attributes.
*/

function replaceImages() {
  const images = document.body.getElementsByTagName('img');
  while (images.length) {
    const image = images[0];
    const text = document.createTextNode(image.alt || '');
    image.parentNode.replaceChild(text, image);
  }
}

/*
  The function below creates an element
  node of the type defined by the first
  argument and then appends the rest of
  the arguments as children.
*/

function elt(type, ...children) {
  const node = document.createElement(type);
  for (let child of children) {
    typeof child != 'string'
      ? node.appendChild(child)
      : node.appendChild(document.createTextNode(child));
  }
  return node;
}
