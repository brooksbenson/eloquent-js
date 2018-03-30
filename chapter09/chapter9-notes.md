# Regular Expressions

Regular expressions are a way to describe patterns in string data. They form a small, separate language that is part of JavaScript and many other languages and systems.

## Regular Expression Values

A regular expression is a type of object that can be formed by the *RegExp* constructor or by writing a literal regex pattern and enclosing it with forward slashes.

## Constructor Syntax

The RegExp constructor defines a string value as its parameter and uses it as the regular expression pattern. To include a backslash as part of the pattern, it needs to be preceded by another backslash, otherwise it will be ignored.

## Literal Syntax

Regular expression literals treat backslashes differently. 

Since forwards slashes start and conclude a pattern, they can't be included in the pattern itself unless preceded by a backslash.

Backslashes that aren't part of special character codes will be preserved rather than ignored and will change the meaning of the pattern.

Some characters have special meaning in regular expressions, and must be preceded by a backslash to be treated literally.

# Matching Mechanics

Regex engines look for a match starting at the first character in a string then move on to the second, and so on. Where the engine is currently scanning is called the current position.

When the current position matches the first part of the expression, the current position moves "down" the string, and the engine attempts to match the position against the following parts of the expression.

## Backtracking

If multiple choice patterns in a regex can match a part of a string, the engine will try all of them, starting with the first, then will *backtrack* the current position to where the choice pattern began, and will try another choice. This will make the process slower.

Backtracking also occurs with the + and * operators. If a regex is written incorrectly, the + and * operators will try and consume a whole string, and by reaching the end, the engine recognizes there is still parts of the expression to check, then will backtrack the current position one character at a time, trying to match the rest of the expression.

## Greed

The +, *, ?, and {} operators are greedy. This term means they will match as many characters as possible before having to backtrack. This behavior can cause problems in our regex patterns. To avoid this, apply a zero or one operator (?) after any of them. This will cause the engine to match more only when the preceding pattern does not match the current position.

## Unicode Option

JavaScript regular expressions work based on code units, and some characters are represented by two code units, like emojis. To get the the regular expression to behave as expected for characters that use two code units, add the unicode option (/u).