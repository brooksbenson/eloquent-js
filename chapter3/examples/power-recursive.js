const powerRecursive = function(base, exponent) {
  if (exponent === 0) {
    return 1;
  } else {
    return base * powerRecursive(base, exponent - 1);
  }
};

console.log(powerRecursive(2, 3));