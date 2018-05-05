# The Document Object Model

When a web page is received by a browser, it parses it and builds a data structure out of it. It uses this data structure to draw the web page on the screen. This structure is one of the tools that a JavaScript program has available. One important thing to note about this data structure is that it is _live_. This means when you modify the data structure the page is redrawn on the screen.

The global binding _document_ gives us access to the data structure created from parsing the HTML document. This data structure is called the Document Object Model, or the DOM. The document binding has a documentElement property that refers to the <html> element of the document, which in turn has head and body properties that refers to those parts of the data structure/document.
