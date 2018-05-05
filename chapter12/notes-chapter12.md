# A Programming Language

Building a programming language can be useful for domain specific problems. Regular Expressions, for example, provide a syntax for matching patterns in string data; a domain specific problem. The result of trying to match string data in JS may be more painful to look at and a lot more work to use than a regular expression. This is an example of how a new syntax can better solve domain specific problems.

## Parsing

The most immediately visible part of a program is its syntax. A _parser_ is program that reads a piece of text and produces a data structure that reflects the structure of the program contained in that text. If the text does not form a valid program, the parser points out the error.

## Evaluating

Evaluating is the process of running a program. In the beginning, the program is just some syntax. By parsing the syntax and forming a data structure, an evaluator can be built to run the program based on the data structure.

## Compilation

Compilation is the process of taking a program and converting it to another format. The new format should allow the program to be run more efficiently or to run in a different environment.
