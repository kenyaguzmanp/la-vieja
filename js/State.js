import { transpose, getDiagonal, getAntiDiagonal } from './utils.js';

export default class State {
  constructor(old) {

    this.turn = "";

    this.board = [];

    this.result = "still running";

    this.players = ['X', 'O'];

    if (old !== undefined) {
      this.board = old.board;
      this.turn = old.turn;
      this.result = old.result;
      this.players = old.players;
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

    this.getNextPlayerTurn = prevTurn => {
      return prevTurn === this.players[0] ? this.players[1] : this.players[0];
    }

    this.advanceTurn = () => {
      // console.log('%c advanceTurn in State', 'background-color:green;color:white;font-size:16px;')
      console.log('%c prev turn', 'background-color:green;color:white;font-size:16px;', this.turn)

      this.turn = this.getNextPlayerTurn(this.turn)

      console.log('%c next turn', 'background-color:green;color:white;font-size:16px;', this.turn)
    };

    this.isTerminal = () => {
      // TODO: Refactor
      if (this.board.length === 0) {
        return false;
      }

      const isTerminalInPlayers = [];
      this.players.forEach(player => {
        const isTerminalInPlayer = this.isTerminalInPlayer(player)
        if (isTerminalInPlayer) {
          this.status = "ended";
          this.result = `${player}-won`;
        }
        isTerminalInPlayers.push(isTerminalInPlayer);
      });

      const isTerminal = isTerminalInPlayers.some(playerTerminal => playerTerminal === true)

      return isTerminal;

      // return isTerminalInX || isTerminalInO;

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