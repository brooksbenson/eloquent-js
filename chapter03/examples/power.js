function power(base, exponent) {
  let result = 1;
  for (let x = 0; x < exponent; x++) {
    result *= base;
  }
  return result;
};

function powerRecursive(base, x) {
  return x == 1
    ? 1
    : base * powerRecursive(base, x - 1);
};

const power = (base, x) => base ** x;