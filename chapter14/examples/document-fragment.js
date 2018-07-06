/*
  Below is some code that appends two paragraph
  elements to the document body that contain
  height information about the first paragraph
  in the DOM.
*/

const { clientHeight, offsetHeight } = document.querySelector('p');
const p = document.createElement('p');
const df = document.createDocumentFragment();
// cloning
const offset = p.cloneNode();
const client = p.cloneNode();
// Writing HTML
offset.innerHTML = `Offset height: ${offsetHeight}`;
client.innerHTML = `Client height: ${clientHeight}`;
// Document fragment API
df.appendChild(offset);
df.appendChild(client);
// The point
document.body.appendChild(df);

/*
  With this code we figured out we can clone nodes,
  create document fragments, and can write the inner
  HTML of a node by assigning a string value to the
  innerHTML property.
*/
