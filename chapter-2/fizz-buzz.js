/*
  Write a program that prints all numbers from 1 to 100.
  When a number is divisible by 3, print "Fizz".
  When a number is divisible by 5, print "Buzz".
  When a number is divisible by both, print "FizzBuzz".
  If a number is divisible by neither 3 or 5, print the number.
*/

const fizzBuzz = () => {
  for (let x = 1; x <= 100; x++) {
    let res = '';
    if (!(x % 3)) res += 'Fizz';
    if (!(x % 5)) res += 'Buzz';
    console.log(res || x); 
  }
};