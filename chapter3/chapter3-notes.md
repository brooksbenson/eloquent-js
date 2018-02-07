# Functions

A function is a piece of program wrapped in a value. Functions come in handy
because they give structure to larger programs by reducing repition, associating
names with subprograms, and isolate subprograms from one another.

Functions are created by an expression that starts with the keyword *function*.

Functions have a set of parameters and a body.

Functions are values just like any other value. The binding a function is assigned to
can receive a new binding, and a function can be passed as an argument to another function.

## Parameters

Parameters to function behave like regular bindings, but their values are given by the
caller of the function, not the function itself.

## Body

The body of a function is the statements that are executed when a function is invoked.

### return

A return statement determines the value that a function returns. When control comes
across such a statement, it immediately jumps out of the function body and gives
the return value to the code that called the function. A return keyword without a
following expression returns undefined.

## Scope

Every binding has a scope. The scope of a binding is the parts of a program where that
binding is visible. 

Bindings that are defined as parameters or inside of functions are visible only to
that function and are called *local*.

### Block scope

Bindings defined with let and const inside a block are visible only within that block.

## The Call Stack