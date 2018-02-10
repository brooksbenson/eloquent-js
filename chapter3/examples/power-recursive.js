function powerRecursive(base, exponent) {
  return exponent === 1
    ? 1
    : base * powerRecursive(base, exponent - 1);
};

console.log(powerRecursive(2, 3));