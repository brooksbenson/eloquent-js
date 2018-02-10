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

### Additional arguments

A function can take a large number of arguments without complaints, even if it wasn't
designed to take the number of arguments given.

### Default arguments

It is possible to define a function and give its parameters default values. These values
will be used if the parameter does not receive a value upon function invocation.

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

The call stack is how control moves through functions in a program. It is how a computer
remembers the context that a function was called in, so that it can return to that point
in the program after the function has finished executing.

The call stack has a cap on how large it can grow. When the stack grows too large, or the
cap has been exceeded, then the program will fail.

## Closures

A closure is a function enclosed by another function. The enclosed function has access to the
local bindings created by the enclosing function. If the enclosed function is returned by the
enclosing function, the enclosed function still has access to the enclosing functions local
bindings. If the enclosed function references those local bindings in its body, those values
will still be valid for use.

## Recursion

Recursion is a control flow where a function calls itself to reach a solution. Recursion
only works if the call stack doesn't exceed its cap.

A function is only a value.