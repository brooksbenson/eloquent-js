function* powers(n) {
  for (let current = n;; current *= n) {
    yield current;
  }
}

for (let n of powers(2)) {
  if (n > 50) break;
  console.log(n);
}

// 2
// 4
// 8
// 16
// 32