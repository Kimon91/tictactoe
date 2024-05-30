
/*
      0 1 2| 3 4 5| 6 7 8 

      0 1 2

  0   1 2 3
  1   4 5 6   
  2   7 8 9
*/



const gameBoard = function () {
    const buttonList = document.querySelectorAll("button");
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

// function createPlayer(name, symbol) {
//     const playerName = name;
//     const playerSymbol = symbol;
//     let playerCells = [];

//     const getName = () => playerName;
//     // const setCells = function (cellNumber) {
//     //     playerCells.push(cellNumber);
//     // }
//     // const getCells = () => playerCells;
//     const getPlayerSymbol = () => playerSymbol;

//     const selectCell = function (board) {
//         board.textContent = playerSymbol;
//     }

//     return { getName, getPlayerSymbol };
// }








function gameController(playerOneName, playerTwoName, screen) {
    let count = 0;
    const board = gameBoard;
    // const player1 = createPlayer("Kimon", "X");
    // const player2 = createPlayer("Machine", "O");
    // const screen = displayController;

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

    const playRound = function (square) {
        square.textContent = activePlayer.symbol;
        switchPlayerTurn();
        screen.textContent = `${activePlayer.name} it's your turn!`;
    }

    function checkScore(board, playerSymbol, playerName) {
        for (let i = 0; i < 3; i++) {
            if (board[i][0].textContent == playerSymbol && board[i][1].textContent == playerSymbol && board[i][2].textContent == playerSymbol) {
                console.log(`${playerName} wins!`);
                return true;
            }
        }
        for (let j = 0; j < 3; j++) {
            if (board[0][j].textContent == playerSymbol && board[1][j].textContent == playerSymbol && board[2][j].textContent == playerSymbol) {
                console.log(`${playerName} wins!`);
                return true;
            }
        }
        if (board[0][0].textContent === playerSymbol && board[1][1].textContent === playerSymbol && board[2][2].textContent === playerSymbol) {
            console.log(`${playerName} wins!`);
            return true;
        }

        if (board[0][2].textContent === playerSymbol && board[1][1].textContent === playerSymbol && board[2][0].textContent === playerSymbol) {
            console.log(`${playerName} wins!`);
            return true;
        }
        let count = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j].textContent != "") count++;
                console.log(count);
            }
        }
        if (count >= 9) return true;
    }

    return {
        getActivePlayer,
        playRound,
        checkScore
    }

    // while (true) {
    //     let overwriteFlag = true; //flag to check if cell is already taken

    //     // player 1 turn
    //     // let input = prompt(` ${player1.getName()} it's your turn!`);
    //     screen.textContent = "Player One it's your turn!";

    //     // board.flat().forEach(function (element) {
    //     //     element.onclick = (function () {
    //     //         this.textContent = player1.getPlayerSymbol();
    //     //     })
    //     // })
    //     // let coordinates = input.split(/[\s,]+/);
    //     // let row = coordinates[0];
    //     // let col = coordinates[1];

    //     // board[row][col] = `${player1.getName()}`;
    //     if (checkScore(board, player1)) break;
    //     // Check if board is full (for a draw)
    //     count++;
    //     if (count >= 9) {
    //         screen.textContent("Game ends in a draw.");
    //         break;
    //     }

    //     // player 2 turn
    //     do {
    //         screen.textContent = "Player Two it's your turn!";
    //         board.flat().forEach(function (element) {
    //             element.onclick = (function () {
    //                 if (this.textContent == player1.getPlayerSymbol()) {
    //                     screen.textContent("This square is taken! Choose another!")
    //                     overwriteFlag = true;
    //                 }
    //                 else {
    //                     overwriteFlag = false;
    //                 }

    //             })
    //         })
    //         // input = prompt(` ${player2.getName()} Please enter grid coordinates (x,y):`);
    //         // coordinates = input.split(/[\s,]+/);
    //         // row = coordinates[0];
    //         // col = coordinates[1];

    //         //checking to see if cell is taken
    //         // if (board[row][col] == player1.getName()) {
    //         //     console.log("This cell is taken, choosing another...");
    //         //     overwriteFlag = true;
    //         // }
    //         // else {
    //         //     overwriteFlag = false;
    //         // }
    //     } while (overwriteFlag);
    //     this.textContent = player2.getPlayerSymbol();

    //     // board[row][col] = `${player2.getName()}`;
    //     if (checkScore(board, player2)) break;
    //     // Check if board is full (for a draw)
    //     count++;
    //     if (count >= 9) {
    //         screen.textContent("Game ends in a draw.");
    //         break;
    //     }
    //     console.log(board);
    // }
};



// gameController();



const displayController = (function () {

    const messageScreen = document.createElement("p");

    const gridContainer = document.querySelector(".gridContainer");
    for (let i = 0; i < 9; i++) {
        const button = document.createElement("button");
        button.classList.add("gridButton");
        button.id = i + 1;
        gridContainer.appendChild(button);
        button.addEventListener("click", clickHandler);
    }
    document.body.insertBefore(messageScreen, gridContainer);

    const board = gameBoard;
    const game = gameController("Player One", "Player Two", messageScreen);
    messageScreen.textContent = `This is Tic-Tac-Toe! ${game.getActivePlayer().name}, you go first!`;

    function clickHandler(e) {
        const selectedSquare = e.target;
        if (selectedSquare.textContent != "") return;
        console.log("You Clicked!");
        game.playRound(selectedSquare);
        if (game.checkScore(board, game.getActivePlayer().symbol, game.getActivePlayer().name)) {
            screen.textContent = "Game is over!";
        }
    }




    console.log(board());

    // return messageScreen;
})();



// mapping a 1d array to a 2d array
// function boardCheck() {
//     const singleBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//     const doubleBoard = [];
//     let count = 0;

//     for (let i = 0; i < 3; i++) {
//         doubleBoard[i] = [];
//         for (let j = 0; j < 3; j++) {
//             doubleBoard[i][j] = singleBoard[count];
//             count++
//         }
//     }

//     console.log(singleBoard);
//     console.log(doubleBoard);
// }

// boardCheck();