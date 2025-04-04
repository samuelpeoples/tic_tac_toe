function gameMaster() {
	let playerOne;
	let playerTwo;
	let currentPlayer = playerOne;

	let roundNum = 0;
	const setPlayer = function (player) {
		if (playerOne !== undefined && playerTwo !== undefined) return;

		if (playerOne === undefined) {
			playerOne = player;
			console.log(`Player one is ${player.name}`);
		} else {
			playerTwo = player;
			console.log(`Player two is ${player.name}`);
		}
		currentPlayer = playerOne;
	};
	const getCurrentPlayer = () => currentPlayer;
	const roundOver = function () {
		roundNum++;
		currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
		console.log(`Current player is ${currentPlayer.name}`);
		winCondition(board.board, currentPlayer)
	};

	return { setPlayer, getCurrentPlayer, roundOver };
}

function makeBoard() {
	const boardGrid = [
		["-", "-", "-"],
		["-", "-", "-"],
		["-", "-", "-"],
	];

	for (let [index, element] of boardGrid.entries()) {
		const boardContainer = document.getElementById("board");
		let row = document.createElement("div");
		row.className = "row";
		boardContainer.appendChild(row);
		console.log(index);
		for (let [innerIndex, innerElement] of boardGrid[index].entries()) {
			let square = document.createElement("div");
			square.id = `tile_${index}${innerIndex}`;
			square.className = "tile";
			square.textContent = "";
			row.appendChild(square);
			console.log(innerIndex);

			square.addEventListener("click", function () {
				let piece = gameManager.getCurrentPlayer().piece
				boardGrid[index][innerIndex] = piece;
				square.textContent = piece;
				console.log(boardGrid);
				gameManager.roundOver();
				winCondition(board.board, gameManager.getCurrentPlayer())
			});
		}
	}
	return { boardGrid };
}

function winCondition(board, player) {
	
}

function makePlayer(name, piece) {
	if (piece != "X" && piece != "O") return;
	let playerName = name;
	let playerPiece = piece;

	const placePiece = function (posX, posY) {
		let location = gameBoard.board[posX][posY];
		console.log(`${playerName} places ${playerPiece} at ${posX},${posY}`);
	};

	if (gameMaster.playerOne === null) gameMaster.playerOne = this;
	else return { name, piece, placePiece };
}

// function initialise() 
	let gameBoard = makeBoard();
	console.log(gameBoard);

	const gameManager = gameMaster();
	const joe = makePlayer("joe", "X");
	const maggy = makePlayer("maggy", "O");
	gameManager.setPlayer(joe);
	gameManager.setPlayer(maggy);

	console.log(`Current player is ${gameManager.getCurrentPlayer().name}`);

	console.log({ joe });

	console.log(`Current player is ${gameManager.getCurrentPlayer().name}`);

//
// initialise();