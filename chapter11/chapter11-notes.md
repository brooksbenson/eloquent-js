# Asynchronous Programming

The processor is the part of the computer that carries out the individual steps that make up our programs. Many programs will interact with things outside of the processor, though, like other computers across the network or the hard disk, and these interactions are a lot slower than working purely from memory. Programming to deal with these slow interactions is called asynchronous programming.

Things happen one at a time in a synchronous programming model. Calling a function that performs a long running action stops the program until that action concludes and the function returns. One way to handle functions that perform long running actions without halting the program is to create an additional thread (another control flow that runs on a separate processor). This thread will run the long running action while another thread runs through the original program. Once the action produces some results, the second thread interweaves them into the original program.

An asynchronous programming model is single threaded but is still able to execute long running actions without halting the program. When a function is called that performs a long running action, the program doesn't halt, but continues to run because the function returns. Internally, the function executed the long running action and assigned a callback function to its results. This callback function is added to a queue and executes when the long running action concludes and its results are made available.

## Callbacks

A function that is passed to a function that makes an asynchronous action and is used to handle the results of that asynchronous action is what is known as a callback. Doing multiple asynchronous actions in a row using callbacks creates high levels of indentation because the results from asynchronous actions keep getting passed to new asynchronous actions via callbacks, and each callback creates another level of indentation.

## Promises

Promises are asynchronous actions that may or may not produce a value. They expose an interface for handling when the asynchronous action produces a value and for when an asynchronous action fails to produce a value.