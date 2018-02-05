# Program Structure

## Expression

An expression is any fragment of code that produces a value.

## Side effects

A side effect is when a program statement effects the statements that come after it.

## Binding

JavaScript bindings are used to catch and hold values. When a binding has been defined, a program can use the binding name to refer to its value.

## The environment

The environment is the collection of bindings and their values that exist at any point in a program.

When a program starts up, the environment is not empty. Depending on the program execution context, different bindings will be available for a program to use. Examples of different execution contexts are the browser and Node.js.

## Functions

A function is a piece of program wrapped in a value. It can be invoked by following the value with a set of parenthesis.

When a function is invoked and produces a value, it is said to return that value. A function can be useful even if it doesn't produce a value, and this is if it effects the environment.

## Control flow

When a program contains more than one statement, that statements are executed from top to bottom.

### Conditional flow

Conditional flow refers to pieces of program only executing when defined conditions are met.

### Looping flow

Looping flow refers to a program repeatedly executing a portion of itself while also updating its state on each loop.

### Updating Bindings