let text = 'The string with 3 numbers in it... 42 and 84';
let number = /\b\d+\b/g;
let match, info = [];
while (match = number.exec(text)) {
  info.push(`Found ${match[0]} at ${match.index}`);
}