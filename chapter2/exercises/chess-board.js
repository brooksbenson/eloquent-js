/*
  Create function that returns a string representing a n * n sized grid
  using newline characters to separate lines.

  The characters that make up the grid should be two in total and should
  alternate as to form a chess board.
*/

function chessBoard(size) {
  let board = '';
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let char = ((i + j) % 2) ? ' ' : '#';
      board += char;
    }
    board += '\n';
  }
  return board;
};

// chessBoard(8)

// # # # # 
//  # # # #
// # # # # 
//  # # # #
// # # # # 
//  # # # #
// # # # # 
//  # # # #