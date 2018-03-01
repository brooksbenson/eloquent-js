/*
  The simplest method of Regular Expression objects
  is test. It receives a string value and returns a
  boolean stating if the pattern matched the text.
*/

/abc/.test('xyzabc'); //true
/abc/.test('cbabb'); //false

/*
  Putting a set of characters between bracket in a
  regular expression makes that part of the expression
  match any characters inside the brackets.

  Within the square brackets, a dash (-) between two
  characters can be used to indicate a range of characters,
  where the ordering is determined by the character's
  unicode number.

  To invert a set of characters, write a caret (^) after
  the first bracket.
*/

/[0123456789]/.test('in 1992'); //true
/[0-9]/.test('in 1992'); //true
/[^abc]/.test('d'); //true;

/*
  In regular expressions, there are a number of character
  groups that have their own built in shortcuts.

  \d - Digit
  \w - Alphanumeric
  \s - Whitespace
  \D - Not digit
  \W - Not alphanumeric
  \S - Not whitespace
*/

/*
  Special Characters

  + - One or more times
  * - Zero or more times
  ? - Optional
  {n} - precise
  {n,n} - range
  {n,} - Open-ended range
*/

/\d+/.test('123'); //true
/\d+/.test(''); //false

/\d*/.test('123'); //true
/\d*/.test(''); //true

let neighbor = /neighbou?r/;
neighbor.test('neighbour'); //true
neighbor.test('neighbor'); //true

let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
dateTime.test("30-1-2003 8:45"); //true

