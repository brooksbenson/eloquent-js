//write a loop that makes use of console.log to output a triangle

const makeATriangle = (levels) => {
  for (let x = 1; x <= levels; x++) {
    console.log('*'.repeat(x));
  }
};