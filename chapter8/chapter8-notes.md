# Bugs and Errors

Flaws in computer programs are usually called bugs. The process of finding those flaws is called debugging.

JavaScript is loosy-goosy with what it allows and doesn't. Multiplying *true* by *monkey* is clearly nonsensical, but JavaScript allows it anyways. Not abiding by JavaScripts grammar, though, will throw an error. Some examples of this would be trying to invoke a value that isn't a function, or looking up a property on an binding whose value is undefined.

## Strict Mode

JavaScript can be make a little more strict by putting the string "use strict" at the top of a file or function body.

In strict mode, for loops can't declare a binding without using the keywords let or var. But, if the binding has already been defined globally, the loop will quietly reassign its value.

In strict mode, the this binding holds the value undefined in functions that are not called as methods or constructors.

In short, putting "use strict" at the top of a program never hurts and may help in spotting a bug.

### Gotcha on Constructors

The this binding in constructors that are called without the keyword new will refer to the global scope and *not* a new object instance, and this will cause the contructor to assign values in the global scope.

Fortunately, constructors created with *class* notation will properly throw an error if called without the new keyword.

## Types

Some languages want to know the types of all bindings and expressions before even running the program, then will tell you when a type is used in an inconsistent way. JavaScript only considers types when running the program, and will quietly convert types in expressions where the operands are not the same type.

Another problem with types is the confusion that arises about what kind of values are accepted by or come out of a function. Comments at the top of a function can help with this.

## Testing

The JavaScript language all in all does not give us a lot of help with finding mistakes. To find them, we have to run the program and see if it does what we expect.

### Automated Testing

Automated testing is the process of writing programs that test other programs. Our tests will run when the program being tested is changed, allowing us to evaluate whether our tested program does what we want it to.

#### Test runners

Test runners help in the design of automated testing by providing a helpful framework for testing programs.

## Debugging

When a program has bugs, pause, then think about what could be causing the bugs. Seek out information about the program through logging, or by using to browsers debugger. Form a hypothesis, then test it.

## Error Propogation

Error Propogation refers to errors arising in program and how we programmers deal with them.

### Exception Handling

Exception handling returns control flow to a certain part of a program when a function cannot proceed normally. Exception handling is a pattern that makes it possible for code that runs into a problem to *throw* or *raise* an exception; the exception proceeds by unwinding the callstack and returning control flow to the part of the program that began the execution or to part of the program that *catches* exceptions.

#### throw

The *throw* keyword is used to raise an exception.

#### try-catch-finally block

The *try-catch-finally* block is used to handle exceptions. The try block is used to try some code out, and if it throws an exception, the catch block below it can use the exception and decide about it. The finally block can be used in replacement of or in addition to the catch block. It contains a block of code that will *always* run after the try block is finished executing.

##### finally block gotcha

If you use the finally block without a catch block, the code in the finally block will execute but the exception will keep unwinding the stack.

## Assertions

Assertions are checks inside a program that verify something is the way it is supposed to be. They shouldn't be used everywhere because it would make for noisy code, but should be use for mistakes that are easy to make, or for mistakes that you, the programmer, are continually making.