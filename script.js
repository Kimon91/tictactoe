const gameBoard = function () {
    const buttonList = document.querySelectorAll(".playButton");
    const rows = 3;
    const columns = 3;
    const board = [];
    let count = 0;
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = buttonList[count];
            count++;
        }
    }
    return board;
};

function gameController(playerOneName, playerTwoName, screen) {
    let count = 0;
    const board = gameBoard;
    const players = [
        {
            name: playerOneName,
            symbol: "X"
        },
        {
            name: playerTwoName,
            symbol: "O"
        }
    ];
    let activePlayer = players[0];
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;

    function resetActivePlayer() {
        activePlayer = players[0];
    }

    function checkScore(board, playerSymbol, playerName, screen) {
        let winSquares = [];
        for (let i = 0; i < 3; i++) {
            if (board[i][0].textContent == playerSymbol && board[i][1].textContent == playerSymbol && board[i][2].textContent == playerSymbol) {
                for (let j = 0; j < 3; j++) {
                    winSquares.push(board[i][j]);
                }
                return winSquares;
            }
        }
        for (let j = 0; j < 3; j++) {
            if (board[0][j].textContent == playerSymbol && board[1][j].textContent == playerSymbol && board[2][j].textContent == playerSymbol) {
                for (let i = 0; i < 3; i++) {
                    winSquares.push(board[i][j]);
                }
                return winSquares;
            }
        }
        if (board[0][0].textContent === playerSymbol && board[1][1].textContent === playerSymbol && board[2][2].textContent === playerSymbol) {
            winSquares.push(board[0][0], board[1][1], board[2][2]);
            return winSquares;
        }

        if (board[0][2].textContent === playerSymbol && board[1][1].textContent === playerSymbol && board[2][0].textContent === playerSymbol) {
            winSquares.push(board[0][2], board[1][1], board[2][0]);
            return winSquares;
        }
    }
    function checkForDraw(board) {
        let count = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j].textContent != "") count++;
            }
        }
        if (count >= 9) return true;
    }
    function playRound(square, screen) {
        square.textContent = activePlayer.symbol;
        if (checkScore(board(), activePlayer.symbol, activePlayer.name, screen)) {
            return checkScore(board(), activePlayer.symbol, activePlayer.name, screen);
        }
        else if (checkForDraw(board())) {
            return 2;
        }
        else {
            switchPlayerTurn();
            return 3;
        }
    }
    function resetGame(board) {
        resetActivePlayer();
        console.log("resetting....")
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j].textContent = "";
            }
        }
    }
    return {
        getActivePlayer,
        playRound,
        checkScore,
        resetGame
    }
};


const displayController = (function () {
    const messageScreen = document.createElement("p");
    const startButton = document.createElement("button");
    startButton.classList.add("startBtn");
    startButton.textContent = "Start Game";
    const gridContainer = document.querySelector(".gridContainer");
    for (let i = 0; i < 9; i++) {
        const playButton = document.createElement("button");
        playButton.classList.add("playButton");
        playButton.id = i + 1;
        gridContainer.appendChild(playButton);
        playButton.addEventListener("click", playClickHandler);
    }
    document.body.insertBefore(messageScreen, gridContainer);
    document.body.insertBefore(startButton, gridContainer);
    const board = gameBoard;
    const game = gameController("Player One", "Player Two", messageScreen);
    playButtons = document.querySelectorAll(".playButton");
    messageScreen.textContent = `This is Tic-Tac-Toe! ${game.getActivePlayer().name}, you go first!`;
    startButton.addEventListener("click", startClickHandler);
    function winningSquares(list) {
        list.forEach(element => {
            element.classList.add("winningSquare");
        });
        playButtons.forEach(element => {
            element.style.pointerEvents = "none";
        })
    }
    function resetSquares() {
        playButtons.forEach(element => {
            element.classList.remove("winningSquare");
            element.style.pointerEvents = "auto";
        })
    }
    function gameRoundUI(gameState) {
        switch (gameState) {
            case 2:
                messageScreen.textContent = "It's a draw!! Press Start to play again!";
                playButtons.forEach(element => {
                    element.style.pointerEvents = "none";
                })
                break;
            case 3:
                messageScreen.textContent = `${game.getActivePlayer().name} it's your turn!`;
                break;
            default:
                messageScreen.textContent = `${game.getActivePlayer().name} wins! Press Start to play again!`;
                winningSquares(gameState);
                break;
        }
    }
    function startClickHandler() {
        game.resetGame(board());
        resetSquares();
        messageScreen.textContent = `${game.getActivePlayer().name} it's your turn!`;
    }
    function playClickHandler(e) {
        const selectedSquare = e.target;
        if (selectedSquare.textContent != "") {
            messageScreen.textContent = `This square is taken! ${game.getActivePlayer().name} choose another one!!`
            return;
        }
        gameRoundUI(game.playRound(selectedSquare, messageScreen));
    }
})();