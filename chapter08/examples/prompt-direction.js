class InputError extends Error {}

function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == 'left') return 'L';
  if (result.toLowerCase() == 'right') return 'R';
  throw new InputError('Invalid direction: ' + result);
}

function look() {
  return promptDirection('Which way?') == 'L'
    ? 'A nice warm house'
    : 'Two ravenous bears';
}

for (;;) {
  try {
    console.log(look());
    break;
  } catch (e) {
    if (e instanceof InputError) {
      console.log('Invalid input. Please try again')
    } else {
      throw e;
    }
  }
}