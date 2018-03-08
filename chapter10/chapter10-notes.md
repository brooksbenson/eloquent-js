# Modules

The ideal program has a crystal clear structure. It's easy to explain how it works, and each part plays a well-defined role.

A typical real program grows organically. New pieces of functionality are added as new needs come up. Structure--or preserving structure--is extra work.

Systems that are built without structure in mind are often called "big balls of mud" because everything sticks together, and when you try to pick out a piece, the whole thing falls apart and your hands get dirty. Its hard for new programmers to figure out such systems because when you are looking at a piece in isolation, it is almost imperative to understand the rest of the system. Modules are an attempt to avoid these problems.

## Module definition

A module is a piece of program that declares its dependencies (what it relies on) and defines an interface (for other modules to interact with). A system built with modules can be thought of like a lego block structure because the relationships between each piece can be easily picked out.

Modules in are handy because they can be used in many different programs and they don't pollute the global namespace.

### Improvised Modules

JavaScript functions can be used to create local scopes and to return an interface. The interface has access to the local scope even after it has been returned; an implementation of the closure pattern.

This style of module provides isolation but does not declare dependencies, which is why it is now obsolete. To make module relationships part of the code, we'll have to take control of the actual loading of modules, and that requires being able to evaluate strings as code. JavaScript is capable of this.

### Common JS

The main concept in a Common JS module system is a function called *require*. The require function takes the name of a module and returns its interface. To accomplish this, the module needs to call require to access its own dependencies, then it returns an interface in an object bound to exports.

### ECMAScript Modules

With ES Modules the idea of dependencies and interfaces remains the same. To declare a dependency from within a module, the keywords *import* and *from* are used, like so: import foo from bar. Exporting things is done in a similar fashion by using the *export* keyword, like so: export x. 

An ES modules interface is not a single value but is a set of bindings. So when you import a module, you import that set of bindings, not their values.

When there is a binding named *default*, it is interpreted as a modules main export. This means that when you import a module with a default export and you leave off the curly braces from the statement, you receive the modules default binding. Exporting a default is done like so: export default x.

It is possible to rename imported bindings using the keyword *as*, like so: import {days *as* dayName} from "date-names".

## Packages

Packages are chunks of code that can be distributed from one place. Any update that a package undergoes will be reflected in this one place, and programs that depend on that package will be able to update their local copy of the package no problem.

### NPM

NPM is an infastructure that serves as a registry for packages and also a program that help you install and manage them. Having quality packages available on NPM is extremely valuable because it allows us to avoid rewriting a program that 100 people have wrote before us, and often these packages have been thoroughly tested and validated.

Packages available on NPM are each licensed. It is important to be aware of the package license and what it means.