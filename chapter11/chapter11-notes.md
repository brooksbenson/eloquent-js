# Asynchronous Programming

The central part of the computer, the part that carries out the individual steps that make up our programs, is called the processor. Some programs are written in way that will keep the processor busy until they are completed, and the speed at which a program finishes is almost entirely dependent on the speed of the processor. Some programs are written to interact with things outside of the processor, like the hard disk or some other computer.

## Synchronous Programming Model

A synchronous programming model is one where things happen one at a time. When a function executes a long running process, the program halts at that point and waits for the function to return.

### Threading

If a program makes two or more network requests, threading is a sychronous solution for reducing the programs execution time lower than the sum total of each of the requests run times. It is done by interweaving another program that makes the second request into the original program. This is made possible by the fact that most modern computers have multiple processors, allowing the interweaved program to execute the request in isolation. When the request made by each program is done, the results are sychronized in the original program.

## Asynchronous Programming Model

An asynchronous programming model is one that allows multiple things to happen at one time. When a function executes a long running request, the processor can carry out other parts of the program while the request wraps up, and when it does, the program is built to handle it.

### Callbacks

A callback is a function that is passed as an argument to a function that performs a slow process and is executed when that process is finished.

### Promises

It is easier to denote abstract principles as actual explicit values. Promises are values that denote piece of asynchronous code, and are designed to execute pieces of code once an asynchronous action has been completed. 

Asynchronous actions represented by promises are concluded by a call to either the resolving or rejecting functions, both of which are passed to the callback function that is passed to the promise. In short, promises either resolve or reject.