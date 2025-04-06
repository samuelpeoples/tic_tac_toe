function gameMaster() {
	let playerOne;
	let playerTwo;
	let currentPlayer = playerOne;
	let roundNum = 1;
	let gameWon = false;
	const log = document.getElementById("log");
	const roundTracker = document.getElementById("roundTracker");

	const setPlayer = function (player) {
		if (playerOne !== undefined && playerTwo !== undefined) return;

		if (playerOne === undefined) {
			playerOne = player;
			// console.log(`Player one is ${player.name}`);
		} else {
			playerTwo = player;
			// console.log(`Player two is ${player.name}`);
		}
		currentPlayer = playerOne;
	};
	const getCurrentPlayer = () => currentPlayer;
	const hasGameWon = () => gameWon;
	const newGame = () => {
		roundNum = 1;
		gameWon = false;
		gameBoard.resetBoard();
		log.innerHTML = "";
		roundTracker.textContent = `Round ${roundNum}: ${currentPlayer.name}'s turn`;
	};

	const roundOver = function (colPos, rowPos) {
		const logText = document.createElement("p");
		gameWon = winCondition(gameBoard.boardGrid, currentPlayer);
		roundNum++;

		if (gameWon) {
			// console.log(`${currentPlayer.name} won the Game!`);
			logText.textContent = `${currentPlayer.name} won the Game!`;
		} else if (roundNum === 9) {
			// console.log(`Draw, out of Moves!`);
			logText.textContent = `Draw, out of Moves!`;
		} else {
			currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
			// console.log(`Current player is ${currentPlayer.name}`);
			logText.textContent = `${currentPlayer.name} places at Col: ${colPos+1} Row: ${rowPos+1}`;
		}

		log.appendChild(logText);
		logText.scrollIntoView();
		if (gameWon) return;
		roundTracker.textContent = `Round ${roundNum}: ${currentPlayer.name}'s turn`;
	};
	return { setPlayer, getCurrentPlayer, newGame, roundOver, hasGameWon };
}

function makeBoard() {
	const boardGrid = ["", "", "", "", "", "", "", "", ""];
	let index = 0;
	const rows = document.getElementsByClassName("row");

	const resetBoard = () => {
		index = 0;
		for (let i = 0; i < boardGrid.length; i++) {
			boardGrid[i] = "";
		}
		for (let row = 0; row < rows.length; row++) {
			rows[row].innerHTML = "";
			rows[row].id = "row" + row;

			for (let col = 0; col < 3; col++) {
				let square = document.createElement("div");
				square.id = `tile_${index}`;
				square.className = "tile";
				square.textContent = "";
				rows[row].appendChild(square);
				const privateIndex = index;
				index++;
				square.addEventListener("click", function () {
					if (gameManager.hasGameWon() === true) return;
					let piece = gameManager.getCurrentPlayer().piece;
					boardGrid[privateIndex] = piece;
					square.textContent = piece;
					console.log(boardGrid);
					gameManager.roundOver(row, col);
				});
			}
		}
	};
	resetBoard();
	return { boardGrid, resetBoard };
}

function winCondition(board) {
	let gameWon = false;
	const winConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < winConditions.length; i++) {
		const condition = winConditions[i];
		const cellA = board[condition[0]];
		const cellB = board[condition[1]];
		const cellC = board[condition[2]];
		if (cellA == "") continue;
		if (cellA === cellB && cellB === cellC) {
			gameWon = true;
			break;
		}
	}
	return gameWon;
}

function makePlayer(name, piece) {
	if (piece != "X" && piece != "O") return;
	let playerName = name;
	let playerPiece = piece;

	const placePiece = function (posX, posY) {
		let location = gameBoard.board[posX][posY];
		// console.log(`${playerName} places ${playerPiece} at ${posX},${posY}`);
	};

	if (gameMaster.playerOne === null) gameMaster.playerOne = this;
	else return { name, piece, placePiece };
}

function initialise() {
	const player1 = makePlayer("X", "X");
	gameManager.setPlayer(player1);

	const player2 = makePlayer("O", "O");
	gameManager.setPlayer(player2);

	newGameButton.textContent = "Reset Game";
	gameManager.newGame();
}

let gameBoard = makeBoard();
const gameManager = gameMaster();

const newGameButton = document.getElementById("new-game");
newGameButton.addEventListener("click", initialise);

initialise();

// console.log(`Current player is ${gameManager.getCurrentPlayer().name}`);
