# Functions

A function is a piece of program wrapped in a value and are awesome because they create a separation of concerns. They are a value just like any other value.

## function expressions

Function expressions are indicated by either a *function* keyword or a fatty arrow *=>*.

## Parameters

Function parameters behave like regular bindings. Their values are assigned by *arguments*. 

## Arguments

Arguments are the *values* that are passed to functions upon invocation.

### Default arguments

It is possible to git parameters default values. These values will be used if the parameter does not receive corresponding arguments.

## Body

The body of a function is the statements that are executed when a function is invoked.

### return

A return statement determines the value that a function returns. When control comes
across such a statement, it immediately jumps out of the function body and gives
the return value to the code that called the function. A return keyword without a
following expression returns undefined.

## Scope

Scope refers to the bindings that are visible at any point in a program. Bindings that are defined as parameters or within a function body cannot be accessed by code outside of the function, so function expressions are said to create their own *scope*.

### Block scope

Bindings defined with let and const within a set of curly braces can only be accessed from within those curly braces. This is called *block scoping*.

## The Call Stack

The call stack is how control moves through functions in a program. It is how a computer remembers the context that a function was called in, so that it can return to that point in the program after the function has finished executing.

The call stack has a cap on how large it can grow. When the stack grows too large, or the
cap has been exceeded, then the program will fail.

## Closures

A closure is a pattern where a function returned by another function remembers the scope of the function that returned it, thus allowing it to access those values in its body.

## Recursion

Recursion is a control flow where a function calls itself to reach a solution. Recursion
only works if the call stack doesn't exceed its cap.

## Growing Functions

Functions arise in programs for two reasons:

1. To avoid rewriting similar code.
2. Capturing a piece of functionality that seems to deserve its own name.

### A note on cleverness

Don't make a function more clever than it has to be. Only add the functionality that you're sure you're going to need.

## Pure functions and side effects

Functions can be roughly divided into those that are called for their side effects and those that are called for their return value.

### Pure function

A pure function is one that doesn't rely on the environment outside of its scope and doesn't affect the environment outside of its scope. 