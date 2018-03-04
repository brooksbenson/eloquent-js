/*
  Test
  
  The simplest method of Regular Expression objects
  is test. It receives a string value and returns a
  boolean stating if the pattern matched the text.
*/

/abc/.test('xyzabc'); //true
/abc/.test('cbabb'); //false

/*
  Character Sets  

  Putting a set of characters between brackets in a
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
  Char Group Shortcuts

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
  . - Matches all characters except newlines
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
  Groups

  A part of a regular expression enclosed by parenthesis is
  called a group, and operators that follow it treat the group
  as a single element.
*/

let crying = /boo+(hoo+)+/;
crying.test('boohooohoo'); //true

/*
  Exec

  Regular Expressions have an exec method that takes
  a string value and, if there is a match, will return
  an array that stores the match and all the substrings
  that matched the groups defined within the regex. The
  return value will have property binded to the index
  of where the match began.

  Strings have a match method that behaves similarly
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
  Boundaries

  ^ - atches the start of the string
  $ - Matches the end of the string
  \b - Matches \w bordered by \W or ^$. Does not match an actual character.
*/

let words = 'Merry dol, derry dol';
words.match(/(\b\w+\b)+/g); //[ 'Merry', 'dol', 'derry', 'dol' ]

/*
  Choice patterns

  The pipe character (|) denotes a choice between 
  the pattern to its left and the pattern to its right.
*/

let animalCount = /\b\d+ (pig|cow|duck)s?\b/;

/*
  The replace method

  The replace method is part of the String class.

  The first argument can either be a string or a regex,
  and is used to match parts of the string. (To match multiple
  parts of the string, the g option must be added to the regex).
  When a match occurs, the second argument determines what should
  replace that part of the string. The second argument can either
  be a string or a function.
  
  A string as the second argument: if the matching expression uses
  groups, the groups can be referred to by using $n, n referring to
  the place of the group in the order of groups in the expression. It
  is possible to refer to the whole match using $&.

  A function as the second argument: if the matching expression uses
  groups, the substrings matching the groups are passed as arguments
  starting at the second argument. The first argument is the whole
  match itself.
*/

let borobudur = 'Borobudur';
borobudur.replace(/[ou]/, 'a'); //Barobudur
borobudur.replace(/[ou]/g, 'a'); //Barabadar

'Jobs, Steve\nGates, Bill\nBezos, Jeff'.replace(/(\w+), (\w+)/g, '$2 $1');
//'Steve Jobs\nBill Gates\nJeff Bezos'

let stock = '1 cabbage, 2 lemons, 101 eggs';
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount === 0) amount = 'No';
  if (amount === 1) {
    unit = unit.slice(0, unit.length - 1);
  }
  return `${amount} ${unit}`;
}

stock.replace(/(\d+) (\w+)/g, minusOne); // 'No cabbage, 1 lemon, 100 eggs'

/*
  Dynamically Creating RegExp Objects

  In some programs you'll create regular expressions dynamically 
  with the RegExp constructor. This will require building up a 
  string that can be translated into a regular expression.
*/
{
  let name = 'harry';
  let text = 'Harry is a great guy.';
  let regex = new RegExp('\\b(' + name + ')\\b', 'gi');
  text.replace(regex, '_$&_'); //_Harry_ is a great guy.

  let name2 = "dea+hl[]rd";
  let text2 = "This dea+hl[]rd guy is creepy.";
  let escaped = name.replace(/[\\[.+*?(){|^$]/g, "\\$&");
  let regex2 = new RegExp("\\b" + escaped + "\\b", "gi");
  text2.replace(regex2, "_$&_"); //This _dea+hl[]rd_ guy is creepy.
}
/*
  Search method

  The search method receives a regular expression
  and returns the index where a match begins. If
  no match was found, it will return a -1.
*/

'  word'.search(/\S/); //2
'  '.search(/\S/); //-1

/*
  Regex properties (source, lastIndex)

  The source property contained in a formed
  regular expression is binded to the string
  expression that it was created from.

  The lastIndex property will, in some
  circumstances, control where the next
  match will start. Those circumstances
  are that either the global (g) or sticky
  (y) flags are enabled and the match should
  happen through the exec method.

  The difference between global and sticky
  is that, when sticky is enabled, the match
  must begin at the start of the last index,
  whereas with global it will search ahead.
*/

/test/.source; //test
{
  let pattern = /x/g;
  let text = 'xyyxz';
  pattern.lastIndex = 2;
  let match = pattern.exec(text);
  match.index; //3
  pattern.lastIndex; //4
  text += text; //xyyxzxyyxz
  let nextMatch = pattern.exec(text);
  nextMatch.index; //5
  pattern.lastIndex; //6
}

{
  let stickyPattern = /abc/y;
  stickyPattern.lastIndex = 4;
  stickyPattern.exec('xyz abc'); //[ 'abc', index: 4, input: 'xyz abc' ]
  stickyPattern.lastIndex = 0;
  stickyPattern.exec('xyz abc'); //null
}

{
  let text = 'The string with 3 numbers in it... 42 and 84';
  let number = /\b\d+\b/g;
  let match, info = [];
  while (match = number.exec(text)) {
    info.push(`Found ${match[0]} at ${match.index}`);
  }
}