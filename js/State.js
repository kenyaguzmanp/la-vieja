import { transpose, getDiagonal, getAntiDiagonal } from './utils.js';

export default class State {
  constructor(old) {

    this.turn = "";

    this.board = [];

    this.result = "still running";

    if (old !== undefined) {
      this.board = old.board;
      this.turn = old.turn;
      this.result = old.result;
    }


    this.getEmptyCellsInBoard = () => {
      const indxs = [];
      for (let column = 0; column < this.board.length; column++) {
        for (let row = 0; row < this.board[column].length; row++) {
          if (this.board[row][column] === "E") {
            indxs.push({ 'row': row, 'column': column });
          }
        }
      }

      return indxs;
    };

    this.isTerminal = () => {

      const transposeBoard = transpose(this.board);
      console.log('regular board', this.board)
      console.log('transpose', transposeBoard)

      const isTerminalInRow = this.board.some(row => {
        return row.every(cell => cell === 'X')
      });

      const isTerminalInColumn = transposeBoard.some(row => {
        return row.every(cell => cell === 'X')
      });

      const diagonal = getDiagonal(this.board);

      const antiDiagonal = getAntiDiagonal(this.board);

      const isTerminalInDiagonal = diagonal.every(cell => cell === 'X')

      const isTerminalInAntiDiagonal = antiDiagonal.every(cell => cell === 'X')

      console.log('diagonal', diagonal);
      console.log('anti diagonal', antiDiagonal);

      return isTerminalInRow || isTerminalInColumn || isTerminalInDiagonal || isTerminalInAntiDiagonal;
    };

  }
}