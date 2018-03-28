/*
  write a function that takes a string of text
  and identifies the dominant writing direction
  of the string. The string is composed of
  characters from various unicode standard scripts,
  each script is labelled with a writing direction.
*/

function dominantDirection(text) {

  const whatDir = c => {
    const code = c.charCodeAt();
    for (let script of SCRIPTS) {
      for (let [start, end] of script.ranges) {
        if (start <= code && code < end) {
          return script.direction;
        }
      }
    }
  };

  let dirHash = {};
  for (let c of text) {
    let dir = whatDir(c);
    dirHash[dir]
      ? dirHash[dir]++
      : dirHash[dir] = 1;
  }

  let dominantDir;
  for (let dir in dirHash) {
    if (dirHash[dir] > dirHash[dominantDir] || !dominantDir) {
      dominantDir = dir;
    } 
  }

  return dominantDir;
}