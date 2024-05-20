/* 1 2 3
   4 5 6   sum of 3 numbers needs to %3 = 0 ???
   7 8 9
*/

const gameBoard = (function () {
    let count = 1;
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = count++;
        }
    }
    return board;
})();

function createPlayer(name) {
    const playerName = name;
    let playerCells = [];

    const getName = () => playerName;
    const setCells = function (cellNumber) {
        playerCells.push(cellNumber);
    }
    const getCells = () => playerCells;

    return { getName, setCells, getCells };
}



function gameController() {
    const board = gameBoard;
    const player1 = createPlayer("Kimon");
    const player2 = createPlayer("Machine");


    for (let i = 0; i < 2; i++) {
        let overwriteFlag = true; //flag to check if cell is already taken

        let input = prompt(` ${player1.getName()} Please enter grid coordinates (x,y):`);
        let coordinates = input.split(/[\s,]+/);

        let row = coordinates[0];
        let col = coordinates[1];

        board[row][col] = `${player1.getName()}`;

        do {
            input = prompt(` ${player2.getName()} Please enter grid coordinates (x,y):`);
            coordinates = input.split(/[\s,]+/);
            row = coordinates[0];
            col = coordinates[1];
            if (board[row][col] == player1.getName()) {
                console.log("This cell is taken, choosing another...");
                overwriteFlag = true;
            }
            else {
                overwriteFlag = false;
            }
        } while (overwriteFlag);
        board[row][col] = `${player2.getName()}`;
        console.log(board);
        // console.log(board[row][col]);
    }
    // console.log(board);
};

// gameController();

// console.log(gameBoard);
// console.log(gameBoard[2][1]);

