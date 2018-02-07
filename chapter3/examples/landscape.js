const landscape = function() {
  let result = '';

  const flat = function(size) {
    for (let count = 0; count < size; count++) {
      result += '_';
    }
  };

  const mountain = function(size) {
    result += '/';
    for (let count = 0; count < size; count++) {
      result += '-'
    }
    result += '\\';
  };

  mountain(2);
  flat(6);
  mountain(4);
  flat(3);
  return result;
};