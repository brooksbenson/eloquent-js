# Higher-order Functions

## Abstractions

Abstraction hides detail, making programs simpler. Abstractions can represent actions, and actions can be described by functions.

### Higher-order Functions

Higher-order function are functions that operate on other functions, either defining them as parameters or returning them. This is a deeply useful aspect of JavaScript because it allows us to write functions with "gaps" in them. The code that calls these functions can fill in the gaps by providing function values.

#### Composability

It is simple to express what Higher-order functions do with a few lines of code, so, their true strong point lies in their composability, that is, the ability to succinctly compose HOFs together to perform operations.