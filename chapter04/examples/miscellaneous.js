// rest parameters

function max(...numbers) {
  let res = -Infinity;
  numbers.forEach(n => {
    if (n > res) res = n;
  });
  return res;
}

//The max function returns the greatest number
//from an arbitrary number of arguments. The rest
//operator makes it easy to take an arbitrary number
//of arguments, stuff them into an array, and bind them
//to an arbirary name

// spread operator (...)

//The spread operator can be used to spread
//out the contents of an array, like so:

let rb = ['red', 'blue'];
let gy = ['green', 'yellow'];
let rbgy = [...rb, ...gy];


// destructuring

// arrays

let [n00, n01, n10, n11] = [0, 1, 2, 3];

//the square brackets on the left hand of the assignment
//indicate the destructuring of an array

//this can also be done with an array as an argument

const da = ([n00, n01]) => console.log(n00, n01);
da([0, 1]);