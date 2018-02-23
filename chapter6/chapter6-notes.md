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

## Maps

Maps are data structures that associate values with other values. It is dangerous to make plain objects maps in JavaScript, because plain objects inherit the properties of their prototype, also, the keys of plain objects can only exist as strings.

Fortunately, the JavaScript language has a class called Map that is optimized for mapping values to values, and allows keys to exist as any type.

## Polymorphism

When a piece of code is written to work with objects with a certain interface, objects that support that interface will just work. In fact, any value type that supports that interface will just work. Therefore, we can write a piece of code that supports a certain interface, and can plug in values that expose the expected interface and our code will work.

### Symbols

When using interfaces you might run into the problem where multiple interfaces use the same property, but each means a different thing, therefore our program is expecting a certain behavior from an interface but the interface doesn't actually support that behavior.

Symbols are values that can serve as a key to an object interface and are created with the Symbol function. Symbols must be evaluated as expressions, requiring square bracket access syntax.

Every value produced by Symbol invocation is unique even if provided the same inputs. Being usable as property names and being unique make symbols suitable for defining interfaces can leave peacefully alongside other arbitrary properties.

#### Iterator interface

Objects provided to for/of loops are expected to be iterable, meaning they have a method named with the Symbol.iterator symbol. When called, that method should return an object that provides a second interface, *iterator*. This is the actual thing that iterates. It should have a next method that return the next result. That result should be an object with a value property, providing the next value, and a done property, which returns true if there is no more results and false if otherwise.

## getters & setters

Objects can contain properties that look like non-method properties, but are in fact methods in disguise. This pattern is implements what are called getters and setters.

By prepending *set* or *get* in front of a property, the property will implement the getter function when the property is being looked up, or the setter function when the property is being manipulated.

## Inheritance

