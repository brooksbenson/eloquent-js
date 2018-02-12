# Values, Types, and Operators

The world of the computer contains only data. You can store data, read data, and create new data using a computer. All data is represented as long sequences of bits. A bit is any kind of two-valued thing, usually described as a zero or one. Any kind of discrete information can be represented by bits.


## Values

A value, at the brass-tags, is a chunk of bits. In JavaScript, there are six discrete value types, each of which has its own role.

### Numbers

Numbers in JavaScript represent numerical values. Each discrete numerical expression uses a fixed number of 64 bits of memory in the computer. This means the number of numbers that can be represented in JavaScript is limited.

#### NaN

A numerical value that results from a nonsensical numerical operation.

#### Infinity

Infinity and -Infinity represent positive and negative infinities and are rarely useful.

### Strings

A value type that represents text.

#### Escaping character

Characters preceded by a \ have special meaning.

#### Unicode Standard

Strings are modeled as a sequence of bits within a computer. The way JavaScript converts characters to bits is based on the unicode standard. The unicode standard assigns a number to almost every character, which makes it possible to encode and decode characters across multiple platforms.

#### Template literals

Template literals are able to embed other values, and when they contain newlines within the code, they encode that newline.

### Booleans

The boolean type is either one of two values: true or false, written as such.

### undefined

Used to denote the absence of a meaningful value

### null

Used to denote the absence of a meaningful value


## Operators

Operators are used to produce new values in JavaScript.

### Arithmetic operations

Arithmetic operations take two number values and produce a new number from them. They make use of arithmetic operators in order to accomplish this.

#### Operator Precedence

Refers to the order that operators are applied to operands when more than one operator is being used.

### Unary Operators

Operators that operate on one value.

### Comparison Operators

Operators that compare two values and produce a boolean value.

###Logical Operators: and, or, not, ternary

Logical operators are used to "reason" about boolean values.

#### and (&&)

And is a binary operator that checks to see if its two operands are both true. 

When the operands are different types, JavaScript will check if the first value is truthy, if so, it will return the right-hand operand, it it's not, it will return the left-hand operand. 

#### or (||)

Or is a binary operator that check to see if either of its two operands are true. 

When the the operands are different types, JavaScript will check if the first value is truthy, if so, that value will be returned, and if it's not, the right-hand operand will be returned. 

#### not (!)

Not is a unary operator used to flip a boolean value

#### ternary (bool ? val : val)

The ternary operator is also called the conditional operator because the boolean value on the left "selects" out of two values. If the boolean value is true, the first value is selected, and if it is false, then the second is selected.


## Automatic Type Conversion

When an operator is applied to the "wrong" type of operand, JavaScript will convert the operand to a type the operator can work with.