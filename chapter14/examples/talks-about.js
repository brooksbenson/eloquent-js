/*
  talksAbout traverses a node and its
  children to identify if the node directly
  or indirectly contains a piece of text.
*/

function talksAbout(node, text) {
  if (node.nodeType == Node.ELEMENT_NODE) {
    for (let child of Array.from(node.childNodes)) {
      if (talksAbout(child, text)) return true;
    }
    return false;
  } else if (node.nodeType == Node.TEXT_NODE) {
    return text.match(node.nodeValue);
  }
}
