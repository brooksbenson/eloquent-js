/*
  Create function that returns string representing size * size grid,
  using newline characters to separate lines. At each point on the grid
  there is either a space of a "#" character. The characters should form
  a chess board.
*/

const chessBoard = (size) => {
  let board = '';
  for (let i = 0; i < size; i++) {
    let row = '';
    for (let j = 0; j < size; j++) {
      row += (i + j) % 2
        ? ' '
        : '#';
    }
    board += row + '/n';
  }
  return board;
};

/*

chessBoard(8)

# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #

*/