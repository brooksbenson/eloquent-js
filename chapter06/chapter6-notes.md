# The Secret Life of Objects

Object-oriented programming helped shape the design of JavaScript.

## Encapsulation

The core idea of object-oriented programming is the breaking program into smaller pieces that manage themselves. This way, knowledge about how a piece works is kept local to that piece, and if a piece changes, only the code involved with that piece needs to be updated.

### Interfaces

Different pieces of a program interact with each other through interfaces. An interface is a limited set of methods or bindings that are publicly exposed.

## this

The *this* binding is available in every part of a JavaScript program, and its value changes based on where control is in the program. When it is referenced in a normal function call it is binder to the global context, and when it is referred to within a method it is binded to the object that the method is apart of.

## prototypes

A prototype is an object used as a fallback source of properties for other objects. 

When a property is looked up on an object that does not own that property, meaning that the property is not directly defined on it, then the objects prototype will be searched for the property, and if the prototype does not own the property, then its prototype will be searched. This process continues until the last prototype in the prototype chain is checked, Object.prototype.

## classes

A class defines a type of object--what methods and properties it has. Such an object is called an *instance* of its class.

## Constructors

If you put the keyword *new* in front of a function call, the function is treated as a constructor. A constructor function has a new object binded to its *this* value, and every property defined on *this* within the constructors body is assigned to the new object, which is implicitly returned at the end of the function body.

Constructor functions have a prototype property that is used to define properties that every instance of the constructor will inherit. In other words, objects created from constructors (instances) are automatically assigned that constructor as their prototype and will inherit the properties defined on the constructors prototype property.

## Maps

Maps are data structures that associate values with other values. It is dangerous to make plain objects maps in JavaScript, because plain objects inherit the properties of their prototype, also, the keys of plain objects can only exist as strings.

Fortunately, the JavaScript language has a class called Map that is optimized for mapping values to values and allows keys to exist as any value type.

## Polymorphism

Polymorphism is a programming style that works with values that support a certain interface. Any value that supports the interface that our polymorphic program is expecting will work in the program. This is intended to increase flexibility.

### Symbols

When using interfaces you might run into the problem where multiple data types use the same interface, but each exhibits a different behavior. Therefore, our program is expecting a certain behavior from an interface but the interface doesn't actually work with that behavior. 

Symbols are values that can serve as a key to an object interface and are created with the Symbol function. Symbols must be evaluated as expressions, requiring square bracket access syntax.

Every value produced by Symbol invocation is unique even if provided the same inputs. Being usable as property names and being unique make symbols suitable for defining interfaces that can live peacefully alongside other arbitrary interface properties.

#### Iterator interface

Objects provided to for/of loops are expected to be iterable, meaning they have a method named with the Symbol.iterator symbol. When called, that method should return an object that provides a second interface. This is the actual object that iterates. It should have a *next* method that returns the next result. That result should be an object with a value property, providing the next value, and a done property, which returns true if there is no more results and false if otherwise.

## getters & setters & static methods

Objects can contain properties that look like non-method properties, but are in fact methods in disguise. This pattern is implemented with what are called getters and setters.

By putting *set* or *get* in front of a property, the property will implement the getter function when the property is being looked up, or the setter function when the property is being manipulated.

Static methods are method that are stored in a class' constructor rather than its prototype.

## Inheritance

Inheritance describes a behavior in object-oriented programming where a class inherits properties and behavior from another class. The ancestor class is called the *superclass*, and the inheritor is the *subclass*.