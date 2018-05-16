# Events

There are a myriad of events that can happen in the browser context: clicks, key presses, focus, etc. The browser allows us to program responses to events through what are called _event listeners_. By registering an event listener to a DOM node and providing a callback to execute we can programatically respond to events.

## Propagation

Events are said to propagate upwards through the DOM. Event listeners attached to parent nodes will be fired if the event matches the listener. To stop propagation, use the stopPropagation method on the event.

## Target

Target is a property of the event object and is the DOM node where the event propogated from.

## Default Behavior

Default behavior is the normal browser behavior for certain events: scrolling with up and down keys, links opening new pages, etc. It's possible to override some of these defaults because the default behavior is usually the last to execute.
