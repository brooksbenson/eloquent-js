# Asynchronous Programming

The central part of the computer, the part that carries out the individual steps that make up our programs, is called the processor. Some programs are written in way that will keep the processor busy until they are completed, and the speed at which a program finishes is almost entirely dependent on the speed of the processor. Some programs are written to interact with things outside of the processor, like the hard disk or some other computer.

## Synchronous Programming Model

A synchronous model is where things happen one at a time. When a function executes a long running process the program stops until the function returns.

### Threading

Threading is when a program delegates work to other programs; it is made possible by computers that have multiple processors.

## Asynchronous Programming Model

An asynchronous model is single threaded and can do multiple things at the same time. It is able to execute a long running process while control continues to move through the program, and when the process is finished, control will move to the part of the program that handles its results.

### Callbacks

A callback is a HOF that gets executed by the function it is passed to. In the context of asynchronous programming, it gets executed after some long running process as a way to handle the processes results.

When multiple asynchronous actions take place in a row, the callback model gets hectic. This is because a callback that handles and passes some results of an asynchronous action to another asychronous action nests that second call inside it, and that second call requires another callback to handle its results. This process can carry on ad infinitum, creating what is called *callback hell*.

### setTimeout

setTimeout is a global binding available in both Node.js and browsers. It accepts a callback as its first argument and the number of milliseconds to wait before executing that function.

Rarely does a program *need* to wait unless it is updating an animation or checking if something is taking longer than a given amount of time.