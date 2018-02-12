function beanCounting(str) {
  let beans = 0;
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === 'B') beans++;
  }
  return beans;
}

function countChar(str, c) {
  let beans = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === c) beans++;
  }
  return beans;
}

const beanCounting2 = (str) => countChar(str, 'B'); 