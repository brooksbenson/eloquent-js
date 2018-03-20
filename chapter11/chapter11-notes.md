# Asynchronous Programming

The processor of a computer is the thing that carries out the individual steps that make up programs. The speed of a program is dependent on the processor and the types of things that the
program does.

## Synchronous Programming Model

A synchronous model is where things happen one after the other. When a function executes a long running process the program stops until the function returns. This behavior is also called *blocking*.

### Threading

Threading is when a program delegates work to other programs; creating two or more flows of control that eventually sychronize.

## Asynchronous Programming Model

An asynchronous model is single threaded and can do multiple things at the same time. It is able to execute a long running process while control continues to move through the program, and when the process is finished, control will move to the part of the program that handles its results.

### The Event Loop

Asychronous behavior happens on its own empty function call stack called the queue, and JavaScript can only run along a single thread. Control moves through the program adding functions to the call stack until it is empty. At that point, the event loop begins executing the callbacks that were added to the queue by moving them onto the call stack. The end.

### Callbacks

A callback is a HOF that gets executed by the function it is passed to. In the context of asynchronous programming, it gets executed after some long running process as a way to handle the processes results.

When multiple asynchronous actions take place synchronously one after the other, the callback model gets hectic. This is because every asynchronous action in the callback model requires a callback, and when asychronous actions get nested within callbacks high levels of indentation are the result. This is a pain on the eyes, and is referred to by some people as *callback hell*.

### setTimeout

setTimeout is a global binding available in both Node.js and browsers. It is a function that  accepts a callback as its first argument and the number of milliseconds to wait before executing the callback as its second.

A program rarely needs to wait unless it is updating an animation or checking to see if an asychronous action has been completed.

### Promises

Promises are instances of the Promise class and are used to handle asynchronous actions. The big thing to note about promises is that they will either *resolve* or *reject*. When a promise resolves, it makes the results of an asynchronous action available to all the code that needs it, and when a promise rejects, it denotes there there was an issue in the asynchronous computation.

### Async functions

An async function is a function that implicitly returns a promise. Inside its body it can pause execution by using the keyword *await* in front of an asynchronous action, and will resume once the expression prefixed with await resolves with a value. The asynchronous function will resolve when the return expression is reached.

### Generators

The ability for functions to be paused and then resumed is not exclusive to async functions. Defining a function with an asterisk in front of it (function*) defines a generator. Generators return iterators. When a generator is first called it pauses at the start, and everytime the next method is called on the iterator the function runs until it hits a yield statement, which at that point it causes the yield value to become part of the iterators state, which the iterator remembers for when the next method is called again. The return expression inside the generator concludes the iterator.

## Network Flooding

Network flooding is a type of communication for broadcasting a message to a whole network. When a node receives a request, it will forward along that request to its neighbors, and those neighbors will forward the request to their neighbors, until the whole netword has received the request.