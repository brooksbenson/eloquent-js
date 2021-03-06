/*
  Replace all single quote characters that
  are not between two word characters in a
  string.
*/

let apostrophe = /\w'\w/;
let singleQuote = /(^|\W)'|'(\W|$)/g;

let text = "'I'm the cook,' he said, 'it's my job.'";
text.replace(singleQuote, '$1"$2'); // "I'm the cook," he said, "it's my job."