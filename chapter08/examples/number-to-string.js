function numberToString(n, base = 10) {
  let result = '', sign = '';
  if (n < 0) {
    sign = '-';
    n = -n;
  }
  do {
    result = (n % base) + result;
    n = Math.floor(n / base);
  } while (n > 0);
  return sign + result;
}