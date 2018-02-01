# Values, Types, and Operators

The world of the computer contains only data. You can store data, read data, and create new data using a computer. All data is represented as long sequences of bits. A bit is any kind of two-valued thing, usually described as a zero or one. Any kind of discrete information can be represented by bits.


## Values

Working with bits without getting lost requires them to be separated into chunks. In JavaScript, those chunks are called values. Every value has a type that determines its role.

### Numbers

Numbers in JavaScript represent numerical values and use a fixed number of 64 bits to be stored.

#### NaN

This value is produced when trying to conduct arithmetic operations that don't yield meaningful results.

#### Infinity

Infinity and -Infinity represent positive and negative infinities and are rarely useful.

### Strings

Strings represent text in JavaScript. They can be enclosed by single quotes, double quotes, or backticks.

#### Escaping character

Characters preceded by a \ have special meaning.

#### Unicode Standard

The unicode standard assigns a number to virtually every character you would ever need. Unicode is how JavaScript encodes characters under the hood.

#### Template literals

Template literals are able to embed other values, and when they contain newlines within the code, they encode that newline.



## Operators

Operators are used to produce new values in JavaScript.

### Arithmetic operations

Arithmetic operations take two number values and produce a new number from them. They make use of arithmetic operators in order to accomplish this.

#### Operator Precedence

Operator precedence refers to the order that arithmetic operations are conducted when multiple arithmetic operations are used in one expression.

### Unary Operators

Operators that operate on one value.

## Booleans