# Regular Expressions

Regular expressions are a way to describe patterns in string data. They form a small, separate language that is part of JavaScript and many other languages and systems.

## Regular Expression Values

A regular expression is a type of object that can be formed by the *RegExp* constructor or by writing a literal value and enclosing it with forward slashes.

### Constructor Syntax

The RegExp constructor defines a string value as its parameter and uses it as the regular expression pattern. To include a backslash as part of the pattern, it needs to be preceded by another backslash, otherwise it will be ignored.

### Literal Syntax

Regular expression literals treat backslashes differently. 

Since forwards slashes start and conclude a pattern, they can't be included in the pattern itself unless preceded by a backslash.

Backslashes that aren't part of special character codes will be preserved rather than ignored and will change the meaning of the pattern.

Some characters have special meaning in regular expressions, and must be preceded by a backslash to be treated literally.

