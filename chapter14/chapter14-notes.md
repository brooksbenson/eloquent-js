# The Document Object Model

One of the tools a JavaScript program has in its sandbox is what is called the DOM, or document object model. When a web page is received by a browser, the browser parses it and builds the DOM out of it. The DOM is a live data structure used to draw the webpage on the screen.

The _document_ binding gives us access to the document object model.

## Trees

A data structure is called a tree when is has a well defined root node, has nodes that refer to other nodes, and contains no cycles (when a node refers to a node that refers to itself, directly or indirectly).

A leaf in a tree is a node that does not contain any other nodes.

The DOM is a tree whose nodes are similar but also differ in important ways. Elements are nodes that contain children, whereas text nodes do not (leaves). To view a nodes type, the nodeType property is available on every node and contains a numerical code that refers to its type.

## Finding Nodes

DOM nodes have properties whose values are links to other nodes (children, childNodes, nextSibling, previousSibling, etc).

DOM nodes also have methods for finding other nodes that they contain. getElementsByTagName and getElementsByClassName are two of those. These methods return array-like objects that are _live_. This means if any of the nodes contained are modified or removed from the DOM, the data structure is updated in real time. To create a solid collection of nodes, the Array.from method should be used and passed the live data structure.

Element nodes can be queried using the document.querySelectorAll method. This method takes a string whose syntax is exactly similar to the CSS selector syntax and returns a solid data structure filled with element nodes that matched the query. The document.querySelector method is exactly similar except it returns a single node that matched first.

## Modifying the DOM

DOM nodes can only exist in one place at a time. So by taking an existing node and moving it someplace else, it is removed from its original position, not duplicated.

To place a node into the DOM, element nodes have appendChild and insertBefore methods whose names reflect the side effect. Element nodes also have a replaceChild method that replaces a child node with another node.

Nodes have a remove method that remove the node from the DOM.

## Creating Nodes

The document binding contains methods for creating new nodes, such as: document.createTextNode and document.createElement.

## Attributes

Most standard HTML attributes are available on DOM nodes as properties. Though, HTML allows you to define your own attributes, and these are not directly available on DOM nodes. Instead, you need to use the getAttribute and setAttribute methods to work with them.

It is customary to prefix made up attributes with data- to ensure they don't conflict with standard attributes.

## Layout

DOM elements each have their own heights and widths. The offset(Height|Width) properties contain the size that the element takes up to the edge of its border, whereas the client(Height|Width) properties contain the size of the element up to where to the padding meets the border.

Getting the precise position of an element on the screen can be done by using the _getBoundingClientRect_ method. It returns an object with top, bottom, left, and right properties that indicate the pixel positions of the sides of the element relative to the top left of the screen. To get the position relative to the entire document, you can add the pageXOffset or pageYOffset values of document to the values returned from getBoundingClientRect().

## Position

The position property of style can be used to determine how a particular element is positioned on the page. It's default is static; meaning it takes up its normal position on the page and cannot be modified. By setting the position to relative, though, you can adjust the distance of the element relative to where it would be positioned if its position were static. By modifying the top, right, bottom, and left properties of style, you can adjust where the element is positioned on the page.

When an elements position is absolute it is removed from the normal flow of the document; meaning it can overlap other elements. By modifying the top, left, right, and bottom properties of style you can position the element relative to the top left of the first enclosing element whose position property isn't static.

## Style

Element nodes have a style property by which you can manipulate that elements style. You can target a specific declaration via the style property.

_specificity_ is a term that refers to how specifically a particular element is targeted. If an element is targeted with high specificity and has styles applied to it, then is targeted again with lower specificity and has styles applied to it, then, if any of the styles are contradicting, the style that was applied with higher specificity is chosen.

## Animations

The global _requestAnimationFrame_ binding schedules a callback to run once the browser is ready to redraw the DOM, and invokes the callback function with the current time.
