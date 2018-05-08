# The Document Object Model

When a web page is received by a browser, the browser parses it and builds a data structure out of it. The browser uses this data structure to draw the web page on the screen. This structure is one of the tools that a JavaScript program has available. One important thing to note about this data structure is that it is _live_. This means when you modify the data structure the page is redrawn on the screen.

The global binding _document_ gives us access to the data structure created from parsing the HTML document. This data structure is called the Document Object Model, or the DOM. The document binding has a documentElement property that refers to the <html> element of the document, which in turn has head and body properties that refers to those parts of the data structure/document.

## Trees

A tree is a branching data structure whose nodes contain nodes that are similar in nature to their parent and has a well defined root. They also don't have cycles, meaning that a node does not contain itself directly or indirectly.

The DOM is a tree whose nodes are similar but also differ in important ways. Elements are nodes that contain children, whereas text nodes to not. To view a nodes type, the nodeType property is available on every node and contains a code that denotes the nodes type.

## Finding Nodes

DOM nodes have properties whose values are links to other nodes (children, childNodes, nextSibling, previousSibling, etc).

DOM nodes also have methods for finding other nodes that they contain. getElementsByTagName and getElementsByClassName are two of those. These methods return array-like objects that are _live_. This means if any of the nodes contained are modified or removed from the DOM, the data structure is updated in real time. To create a solid collection of nodes, the Array.from method should be used and passed the live data structure.

## Modifying the DOM

DOM nodes can only exist in one place at a time. So by taking an existing node and moving it someplace else, it is removed from its original position, not duplicated.

To place a node into the DOM, element nodes have appendChild and insertBefore methods whose names reflect the side effect. Element nodes also have a replaceChild method that replaces a child node with another node.

Nodes have a remove method that remove the node from the DOM.

## Creating Nodes

The document binding contains methods for creating new nodes, such as: document.createTextNode and document.createElement.

## Attributes

Most standard HTML attributes are available on DOM nodes as properties. Though, HTML allows you to define your own attributes, and these are not directly available on DOM nodes. Instead, you need to use the getAttribute and setAttribute methods to work with them.

It is custom to prefix made up attributes with data- to ensure they don't conflict with standard attributes.

## Layout

DOM elements each have their own heights and widths. The offset(height|width) properties contain the size that the element takes up, whereas the client(height|width) properties contain the size within the element, that is, the elements size not including its border.

Getting the precise position of an element on the screen can be done by using the getBoundingClientRect method. It returns an object with top, bottom, left, and right properties that indicate the pixel positions of the sides of the element relative to the top left of the screen. To get the position relative to the whole document, you can use the pageXOffset pageYOffset value of document.
