# Events

There are a myriad of events that can happen in the browser context: clicks, key presses, focus, etc. The browser allows us to program responses to events through what are called _event listeners_. By registering an event listener to a DOM node and providing a callback to execute we can programatically respond to events.

## Window

_window_ is a binding provided by the browser and represents the browser window that contains the document. It is capable of having an event listener registered to it.

## onclick vs. addEventListener

DOM nodes have an onclick attribute that can be assigned a function value that is executed when a click happens in the context of that node. The problem with onclick is that it can only be assigned one function value at a time. An alternative to the onclick attribute is event listeners. Multiple event listeners can be assigned to a DOM node, and event listeners are capable of handling more events than clicks.

## The Event Object

The event object is passed as an argument to the event handling functions registers via addEventListener. It contains extra info about the event and some methods for changing how the event behaves.

## Propagation

Events are said to propagate upwards through the DOM. Event listeners attached to parent nodes will be fired if the event matches the listener. To stop propagation, use the stopPropagation method on the event.

## Target

Target is a property of the event object and is the DOM node where the event propogated from.

## Default Behavior

Default behavior is the normal browser behavior for certain events: scrolling with up and down keys, links opening new pages, etc. It's possible to override some of these defaults because the default behavior is usually the last to execute.

## Key Events

The event object passed to a registered callback on a key event contains a _key_ property whose value is a string denoting the key that was pressed. The event object also contains ctrlKey, altKey, metaKey, and shiftKey properties whose values are boolean.

## Mouse Events

Mouse events include "mouseup" and "mousedown". When mouse up and down events are both fired on an element, a "click" event propagates from that element.

Mouse events have clientX and clientY properties that are the events coordinates relative to the top left of the window. The pageX and pageY properties are the coordinates relative to the top left of the document.

## Touch Events

Touch events are fired for touchscreen devices and include touchstart, touchmove, and touchend. Touch screens allow for multiple touches at a time which can be detected via the touches property on a touch event. The value of touches is an array-like object of coordinate pairs corresponding to the touches.

## Scroll Events

When an element is scrolled, the scroll event fires on the element being scrolled. The pageYOffset property on window is the distance that has been scrolled, and the innerHeight property is the height of the window.

## Load Events

When a page finishes loading, the load event fires on the window and document body objects. When a page is closed or navigated away from a "beforeunload" event fires.

## Web Workers

Web Workers are JS processes that run alongside the main script on their own timeline and are useful because they remove code from the normal event loop. They do not have access to the global scope nor do they share any other data with the main script; they can be thought of like pure functions that receive "messages".

Web workers require "message" events to be registered to them. To fire the message callback, you invoke the postMessage method of the web worker (made available in the main script) and pass it some data which is made available in the argument passed to the callback under the name "data". The value received by the callback is a serialized version of the value, not the value itself.

## Debouncing

Debouncing is a technique for handling events that occur rapidly, like scroll and mousemove. By using setTimeout, it is possible to decide when and how often the main logic of an event handler occurs.
