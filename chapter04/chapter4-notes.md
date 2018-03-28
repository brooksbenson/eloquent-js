# Data Structures

A data structure is the way a collection of values is stored. A good data structure is defined in such a way as to allow a programmer to retrieve and modify data effectively.

## Objects

Objects are values used to define arbitrary collections of properties.

## Properties

Every value in JavaScript, except null & undefined, have properties. Properties are binded to values.

## Methods

A method is a property that is binded to a function value.

## Arrays

An array is a value for storing sequences of other values.

## Stacks

A stack is a data structure that allows a program to push values onto it and pop values off. The terms push and pop are popular when refering to adding or removing from a stack.

## Indexes

Arrays are organized based on an indexing system. Every value in an array has an index, which can be thought of as an address for that value. The first value in an array is found at index 0, and every preceding value can be found at the the next index, which increments by 1. An index is equal to the amount of values to skip in an array to reach that index. You don't have to skip any values to reach the first value in an array, so its index is 0.

## delete

A unary operator used to remove a property from an object.

## in

A binary operator whose operands consist of a string and an object and whose result yields a boolean stating whether or not a property by that name exists in the object or its prototype(s)

## Object.keys

A method of the Object value that takes an object as an argument and returns an array storing the names of every property on the provided object.

## Object.assign

A method of the Object value that takes an object as its first and second argument, then defines the properties of the second argument on the first.

## Mutability

An object value is mutable, meaning that a program can change an object value to be something else. Strings, numbers, and booleans, on the other hand, are immutable, meaning that any value of the listed types cannot be changed. They can be used in expressions to produce new values, but cannot themselves be changed.

If a binding is binded to an object value, and that object value changes, the binding points to the modified object. If a binding is binded to an immutable value, the binding needs to be rebinded to a completelty new value in order for its value to change.

## Serialization

Serialization is the process of translating data structures or objects into a format that can be stored, or transmitted, and then reconstructed later.

## JSON

A popular serialization format is called JSON, which stands for JavaScript Object Notation. JSON is widely used as a data storage and communication format on the web, even in languages other than JavaScript.

### JSON.stringify

A method of the JSON value that serializes a value in the JSON format.

### JSON.parse

A method of the JSON value that parses a serialized JavaScript value.