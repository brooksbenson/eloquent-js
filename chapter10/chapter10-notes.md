# Modules

The ideal program has a crystal clear structure. It's easy to explain how it works, and each part plays a well-defined role.

A typical real program grows organically. New pieces of functionality are added as new needs come up. Structure--or preserving structure--is extra work.

Systems that are built without structure in mind are often called "big balls of mud" because everything sticks together, and when you try to pick out a piece, the whole thing falls apart and your hands get dirty. Its hard for new programmers to figure out such systems because when you are looking at a piece in isolation, it is almost imperative to understand the rest of the system. Modules are an attempt to avoid these problems.

## Module definition

A module is a piece of program that declares its dependencies (what it relies on) and defines an interface (for other modules to interact with). A system built with modules can be thought of like a lego block structure because the relationships between each piece can be easily picked out.

Modules are handy because: they give structure to larger programs, can be used in different programs, and don't pollute the global namespace.

## Module Design

### Composability

Composability refers to how well a module can be composed with other modules. An example of a module that doesn't follow this principle is one that insists on reading some data from a *specific* source rather than a more *composable* source. If a module asks for some data from the file system and is running on the browser, then you won't be able to access the file system. A more composable module would be one that works with a plain JavaScript value, or something along those line.

### Ease of Use

Ease of use refers to how easily a modules interface is to work with.

When it is possible to define a function as an interface, use a function. Instead of having to go through the ritual of creating an object and then storing the results of a module call within it and then using specialized methods to get at the results, it's better to just call a function for its return value and leave it at that. Using stateful objects can lead to unnecessary interdependencies. 

When deciding about the data structures a module should accept, take a look around and see what data structures other modules are using. This creates a nice level of consistency for a modules users.

### Improvised Modules

JavaScript functions can be used to create local scopes and to return an interface. The interface has access to the local scope even after it has been returned; an implementation of the closure pattern.

This style of module provides isolation but does not declare dependencies, which is why it is now obsolete. To make module relationships part of the code, we'll have to take control of the actual loading of modules, and that requires being able to evaluate strings as code. JavaScript is capable of this.

### Common JS

The main concept in a Common JS module system is the *require* function. The require function takes the name of a module and returns its interface. To accomplish this, the module needs to call require to access its own dependencies, then it returns an interface in an object bound to exports. Along the way, the require function is caching modules that have already been required, so if a module has already been loaded, the module doing to requiring pulls from the cache rather than reloading it.

### ECMAScript Modules

With ES Modules the idea of dependencies and interfaces remains the same. To declare a dependency from within a module, the keywords *import* and *from* are used, like so: import foo from bar. Exporting things is done in a similar fashion by using the *export* keyword, like so: export x. 

An ES modules interface is not a single value but is a set of bindings. So when you import a module, you import that set of bindings, not their values.

When there is a binding named *default*, it is interpreted as a modules main export. This means that when you import a module with a default export and you leave off the curly braces from the statement, you receive the modules default binding. Exporting a default is done like so: export default x.

It is possible to rename imported bindings using the keyword *as*, like so: import {days *as* dayName} from "date-names".

## Packages

Packages are chunks of code that can be distributed from one place. Any update that a package undergoes will be reflected in this one place, and programs that depend on that package will be able to update their local copy of the package no problem.

### NPM

NPM is an infastructure that serves as a registry for packages and also a program that help you install and manage them. Having quality packages available on NPM is extremely valuable because it allows us to avoid rewriting a program that 100 people have wrote before us, and often these packages have been thoroughly tested and validated.

Each package on NPM has a license, and it is important to be aware of the package license and what it means.

## Building and Bundling

*Compiling* is the process of taking a dialect of JavaScript code and translating into a version of JavaScript that can be ran on multiple platforms.

*Bundling* is the process of taking all the files that make up a JavaScript program and rolling them into one big file.

*Minifying* is the process of taking a JavaScript program and making it as small as possible by removing whitespace, comments, renaming variables, and rewriting code with equivelant code that takes up less space.