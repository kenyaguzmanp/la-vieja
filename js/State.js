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

    this.advanceTurn = () => {
      // TODO: modify to handle different type of players
      this.turn = this.turn === "X" ? "O" : "X";
    };

    this.isTerminal = () => {
      // TODO: Refactor
      if (this.board.length === 0) {
        return false;
      }
      const isTerminalInX = this.isTerminalInPlayer('X');
      const isTerminalInO = this.isTerminalInPlayer('0');

      if (isTerminalInX) {
        this.status = "ended";
        this.result = `X-won`;
      } else if (isTerminalInO) {
        this.status = "ended";
        this.result = `Y-won`;
      } else {
        // TODO: handle this
        console.log('TIE OR STILL EMPTY');
      }

      return isTerminalInX || isTerminalInO;

    }


    this.isTerminalInPlayer = playerValue => {
      // playerValue = 'X' o 'O'

      const transposeBoard = transpose(this.board);
      // console.log('regular board', this.board)
      // console.log('transpose', transposeBoard)

      const isTerminalInRow = this.board.some(row => {
        return row.every(cell => cell === playerValue)
      });

      const isTerminalInColumn = transposeBoard.some(row => {
        return row.every(cell => cell === playerValue)
      });

      const diagonal = getDiagonal(this.board);

      const antiDiagonal = getAntiDiagonal(this.board);

      const isTerminalInDiagonal = diagonal.every(cell => cell === playerValue)

      const isTerminalInAntiDiagonal = antiDiagonal.every(cell => cell === playerValue)

      // console.log('diagonal', diagonal);
      // console.log('anti diagonal', antiDiagonal);

      return isTerminalInRow || isTerminalInColumn || isTerminalInDiagonal || isTerminalInAntiDiagonal;
    };

  }
}