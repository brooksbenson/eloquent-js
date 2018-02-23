# The Secret Life of Objects

Object-oriented programming has helped shape the design of the JavaScript language.

## Encapsulation

The core idea of object-oriented programming is the breaking of programs into small pieces, then allowing those small pieces to manage themselves. This way, knowledge about how a piece works is kept local to that piece. If a program piece changes, only the code involved with that piece needs to be updated.

### Interfaces

Different pieces of a program interact with each other through *interfaces*. An interface is a limited set of methods or bindings that are publicly exposed. These publicly exposed values provide an abstraction layer over the lower level implementation.

*public*: properties that are part of an interface are called public.
*private*: properties that important to the function of an encapsulated program but should not be touched by outside programs.

## this

Each function has its own *this* binding, which receives its value depending on how the function is invoked. A function cannot refer to the *this* value the wrapping scope if it is defined with the *function* keyword. Though, an arrow function does not create its own *this* value, and can reference the this value of the scope that contains it.

## prototypes

Most objects in JS have a prototype. A prototype is anothe object that is used as a fallback source of properties. When an object gets a request for a property that it doesn't have, its prototype will be searched for the property, and its prototype will be searched for the property, etc.

Prototypes are useful for defining properties for which all instances of a class share the same value, such as methods.

## classes

A class defines the shape of a type of object--what methods and properties it has. Such an object is called an *instance* of its class.

## Constructors

If you put the keyword *new* in front of a function call, the function is treated as a constructor. This means an object with the right prototype is automatically created, bound to *this* in the function body, and returned automatically at the end of the function.

### Constructor.prototype

You find the prototype of every constructor by looking up its prototype property. This property is how you define the properties that all constructor instances will share.

##maps