/* 1 2 3
   4 5 6
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


function gameController() {
    let flag = true;
    const board = gameBoard;
    // const input = "";

    // if (flag) {
    //     const input = prompt("Please enter grid coordinates (x,y):");
    //     const coordinates = input.split(/[\s,]+/);

    //     const row = coordinates[0];
    //     const col = coordinates[1];

    //     board[row][col] = "x";
    //     console.log(board);
    //     // console.log(board[row][col]);
    //     flat = false;
    // }

    for (let i = 0; i < 4; i++) {
        const input = prompt("Please enter grid coordinates (x,y):");
        const coordinates = input.split(/[\s,]+/);

        const row = coordinates[0];
        const col = coordinates[1];

        board[row][col] = "x";
        console.log(board);
        // console.log(board[row][col]);
        flat = false;
    }

};

// gameController();

// console.log(gameBoard);
// console.log(gameBoard[2][1]);

