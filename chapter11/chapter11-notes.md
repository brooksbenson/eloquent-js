# Asynchronous Programming

The processor of a computer is the thing that carries out the individual steps that make up programs. The speed that our programs finish executing is dependent on the processor and the types of things that our programs do (some things take much longer than others).

## Synchronous Programming Model

A synchronous model is where things happen one at a time. When a function executes a long running process the program stops until the function returns.

### Threading

Threading is when a program delegates work to other programs; it is made possible by computers that have multiple processors.

## Asynchronous Programming Model

An asynchronous model is single threaded and can do multiple things at the same time. It is able to execute a long running process while control continues to move through the program, and when the process is finished, control will move to the part of the program that handles its results.

### Callbacks

A callback is an HOF that gets executed by the function it is passed to. In the context of asynchronous programming, it gets executed after some long running process as a way to handle the processes results.

When multiple asynchronous actions take place synchronously, the callback model gets hectic. This is because every asynchronous action in the callback model requires a callback, and when asychronous actions get nested within callbacks high levels of indentation are the result. This is a pain on the eyes, and is referred to by some people as *callback hell*.

### setTimeout

setTimeout is a global binding available in both Node.js and browsers. It is a function that  accepts a callback as its first argument and the number of milliseconds to wait before executing the callback as its second.

A program rarely needs to wait unless it is updating an animation or checking to see if an asychronous action has been completed.

### Promises