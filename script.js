
/*
      0 1 2| 3 4 5| 6 7 8 

      0 1 2

  0   1 2 3
  1   4 5 6   
  2   7 8 9
*/

const displayController = (function () {
    const messageScreen = document.createElement("p");
    messageScreen.textContent = "This is the message screen!";

    const gridContainer = document.querySelector(".gridContainer");
    for (let i = 0; i < 9; i++) {
        const button = document.createElement("button");
        button.classList.add("gridButton");
        button.id = i + 1;
        gridContainer.appendChild(button);
    }
    document.body.insertBefore(messageScreen, gridContainer);

    return messageScreen;
})();

const gameBoard = (function () {
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
    console.log(board);
    return board;
})();

function createPlayer(name, symbol) {
    const playerName = name;
    const playerSymbol = symbol;
    let playerCells = [];

    const getName = () => playerName;
    // const setCells = function (cellNumber) {
    //     playerCells.push(cellNumber);
    // }
    // const getCells = () => playerCells;
    const getPlayerSymbol = () => playerSymbol;

    const selectCell = function (board) {
        board.textContent = playerSymbol;
    }

    return { getName, getPlayerSymbol };
}

function checkScore(board, playerName) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] == playerName && board[i][1] == playerName && board[i][2] == playerName) {
            console.log(`${playerName} wins!`);
            return true;
        }
    }
    for (let j = 0; j < 3; j++) {
        if (board[0][j] == playerName && board[1][j] == playerName && board[2][j] == playerName) {
            console.log(`${playerName} wins!`);
            return true;
        }
    }
    if (board[0][0] === playerName && board[1][1] === playerName && board[2][2] === playerName) {
        console.log(`${playerName} wins!`);
        return true;
    }

    if (board[0][2] === playerName && board[1][1] === playerName && board[2][0] === playerName) {
        console.log(`${playerName} wins!`);
        return true;
    }
}






function gameController() {
    let count = 0;
    const board = gameBoard;
    const player1 = createPlayer("Kimon", "X");
    const player2 = createPlayer("Machine", "O");
    const screen = displayController;


    while (true) {
        let overwriteFlag = true; //flag to check if cell is already taken

        // player 1 turn
        // let input = prompt(` ${player1.getName()} it's your turn!`);
        screen.textContent = "Player One it's your turn!";
        board.flat().forEach(function (element) {
            element.onclick = (function () {
                this.textContent = player1.getPlayerSymbol();
            })
        })
        // let coordinates = input.split(/[\s,]+/);
        // let row = coordinates[0];
        // let col = coordinates[1];

        // board[row][col] = `${player1.getName()}`;
        if (checkScore(board, player1.getName())) break;
        // Check if board is full (for a draw)
        count++;
        if (count >= 9) {
            console.log("Game ends in a draw.");
            break;
        }

        // player 2 turn
        do {
            input = prompt(` ${player2.getName()} Please enter grid coordinates (x,y):`);
            coordinates = input.split(/[\s,]+/);
            row = coordinates[0];
            col = coordinates[1];

            //checking to see if cell is taken
            if (board[row][col] == player1.getName()) {
                console.log("This cell is taken, choosing another...");
                overwriteFlag = true;
            }
            else {
                overwriteFlag = false;
            }
        } while (overwriteFlag);

        board[row][col] = `${player2.getName()}`;
        if (checkScore(board, player2.getName())) break;
        // Check if board is full (for a draw)
        count++;
        if (count >= 9) {
            console.log("Game ends in a draw.");
            break;
        }
        console.log(board);
    }
};



// gameController();



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