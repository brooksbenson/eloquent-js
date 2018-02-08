// const multiplier = function(factor) {
//   return (n) => n * factor;
// };

// const twice = multiplier(2);
// const thrice = multiplier(3);

// console.log(twice(10)); //20
// console.log(thrice(10)); //30

let globalNumber = 4;

const encloseMultiplier = function(localNumber) {
  return () => globalNumber * localNumber;
};

const multiplier = encloseMultiplier(4);
globalNumber = 2;

console.log(multiplier()); //8