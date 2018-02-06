//write a loop that makes use of console.log to output a triangle

const makeATriangle = (levels) => {
  let tri = '';
  for (let x = 0; x < levels; x++) {
    tri += '#';
    console.log(tri);
  }
};