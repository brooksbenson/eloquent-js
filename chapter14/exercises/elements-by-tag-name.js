/*
  Write your own version of getElementsByTagName
  that receives an element node and returns all
  direct and indirect child nodes of the type
  denoted by the string passed as the second
  argument.
*/

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
