# Data Structures

Data structures are the particular ways that a collection of values are stored. Good data structures are defined in such a way as to allow a programmer to retrieve a modify data efficiently.

## Arrays

An array is a value for stories sequences of other values.

### Indexes

Every value in an array has an index, which starts at 0 for the first value, and increments by one for every preceding value. A values index can be thought of as the amount of values to skip in an array to reach that value.

## Properties

Every value in JavaScript, except null & undefined, have properties. Properties hold values.

### Method

A method is a property that holds a function value.

## Stacks

A stack is a data structure that allows a program to push values onto it and pop values off. The terms push and pop are popular when refering to adding or removing from a stack.

## Objects

Objects are values used to define arbitrary collections of properties.

### delete

A unary operator used to remove a property from an object.

### in

A binary operator used on a string and an object that returns a boolean stating whether or not the object operand has a property named the string operand.

### Object.keys

A method of the Object value that takes an object as an argument and returns an array storing the name of every property on the provided object.

### Object.assign

A method of the Object value that takes an object as its first and second argument, then defines the properties of the second argument to the first.

## Mutability

An object value is mutable, meaning that a program can change an object value to be something else. Strings, numbers, and booleans, on the other hand, are immutable, meaning that any value of the listed types cannot be changed. They can be used in expressions to produce new values, but cannot themselves be changed.

If a binding is binded to an object value, and that object value changes, the binding points to the modified object. If a binding is binded to an immutable value, the binding needs to be rebinded to a completelty new value in order for its value to change.

## Serialization

Serialization is the process of translating data structures or object state into a format that can be stored or transmitted and reconstructed later. When a serialized product is reread on another machine, it can be used to create a semantically identical clone of the original object.

### JSON

A popular serialization format is called JSON, which stands for JavaScript Object Notation. JSON is widely used as a data storage and communication format on the web, even in languages other than JavaScript.

### JSON.stringify

A method of the JSON value that serializes a value in the JSON format.

### JSON.parse

A method of the JSON value that parses a serialized JavaScript value.