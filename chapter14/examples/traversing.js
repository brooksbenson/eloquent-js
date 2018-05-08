/*
  talksAbout recursively searches the DOM
  until it finds a text node contains text
  we are searching for.
*/

function talksAbout({ nodeType, childNodes, nodeValue }, text) {
  if (nodeType === document.ELEMENT_NODE) {
    for (let i = 0; i < childNodes.length; i++) {
      if (talksAbout(childNodes[i], text)) return true;
    }
  } else if (nodeType === document.TEXT_NODE) {
    return nodeValue.includes(text);
  }
}
