/*
  Write a function that returns an array
  composed of element nodes that are
  descendants of the *node* parameter
  and whose tag name matches the *tagName*
  parameter.
*/

// FIRST SOLUTION
const byTagName = (node, tagName) => {
  tagName = tagName.toUpperCase();
  const elements = [];
  const traverse = node => {
    const children = Array.from(node.children);
    for (let child of children) {
      if (child.nodeType === document.ELEMENT_NODE) {
        if (child.nodeName === tagName) {
          elements.push(child);
        }
        traverse(child);
      }
    }
  };
  traverse(node);
  return elements;
};

// SECOND SOLUTION
function byTagName(node, tagName) {
  const elements = [];
  (function find(el) {
    if (el.nodeName == tagName.toUpperCase()) {
      elements.push(el);
    }
    Array.from(el.children).forEach(c => find(c));
  })(node);
  return elements;
}
