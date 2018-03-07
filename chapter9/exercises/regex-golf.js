/*
  For each of the following items, write a regular expression
  to test whether any of the given substrings occur in a string.

  1. car and cat
  2. pop and prop
  3. ferret, ferry, and ferrari
  4. Any word ending in ious
  5. A whitespace character followed by a period, comma, colon, or semicolon
  6. A word longer than six letters
  7. A word without the letter e
*/

let one = /ca[rt]/i;
let two = /pr?op/i;
let three = /ferr(y|et|ari)/i;
let four = /ious\b/i;
let five = /\s[.,:;]/;
let six = /\w{7,}/i;
let seven = /\b[^\We]\b/i;