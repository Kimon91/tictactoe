/* 1 2 3
   4 5 6
   7 8 9
*/

const gameBoard = (function () {
    let count = 0;
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

console.log(gameBoard);

