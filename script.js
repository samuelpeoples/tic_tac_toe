function makeBoard() {
  const board = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];
  return { board };
}

let gameBoard = makeBoard();
console.log(gameBoard.board[1][2]);

function makePlayer(name, piece) {
  if(piece != 'X' && piece != 'O') return; 
  let playerName = name;
  let playerPiece = piece;

  const placePiece = function(posX, posY) {
    let location = gameBoard.board[posX][posY];
    console.log(`${playerName} places ${playerPiece} at ${location}`)
  };
  return {name, piece, placePiece};
}


const joe = makePlayer('joe', 'X');
joe.placePiece(1, 1);

console.log({joe})