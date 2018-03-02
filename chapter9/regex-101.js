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

/*
  A part of a regular expression enclosed by parenthesis is
  called a group, and operators that follow it treat the group
  as a single element.
*/

let crying = /boo+(hoo+)+/;
crying.test('boohooohoo'); //true

/*
  Regular Expressions have an exec method that takes
  a string value and, if there is a match, will return
  an array that stores the match and all the substrings
  that matched the groups defined within the regex.

  Strings have a match method that behave similarly
  to exec, but define a regex value as a parameter.
*/

/\d+/.exec('one two 100'); //["100"]
'one two 100'.match(/\d+/); //["100"]
/'([^'])'/.exec("she said 'hello'"); //["'hello'", "hello"]
/bad(ly)?/.exec('bad'); //["bad", undefined]
/(\d)+/.exec('123'); // ["123", "3"]


function getDate(s) {
  let [_, d, m, y] = s.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  return new Date(y, m - 1, d);
}

getDate("17-3-1995"); //1995-03-17T07:00:00.000Z

/*
  Boudaries

  ^ - atches the start of the string
  $ - Matches the end of the string
  \b - Matches word char bordered by non-word char. Does not match an actual character.
*/