function canYouSpotTheProplem() {
  "use strict";
  for (counter = 0; counter < 10; counter++) {
    console.log('llll');
  }
}

// canYouSpotTheProplem(); //ReferenceError

function returnUndefined() {
  "use strict";
  return this;
}

// returnUndefined(); //undefined