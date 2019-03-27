import State from './State.js';
import { getGridDataBySize } from './utils.js'

export default class UI {
  constructor({ boardElement = {}, startButton = {}, gridSizeElement = {}, board = [] }) {

    this.board = board;

    this.state = {};

    this.gridSize = 0;

    this.boardElement = boardElement;

    this.startButton = startButton;

    this.gridSizeElement = gridSizeElement;

    this.destroyBoardElementsByBoard = () => {
      const cells = document.querySelectorAll(".cell");
      if (cells.length > 0) {
        for (let index = 0; index < cells.length; index++) {
          cells[index].parentNode.removeChild(cells[index]);
        }
      }
    }

    this.buildBoardElementsByBoardArr = () => {
      console.log('BUILDING BOARD ELEMENTS')
      // const boardElement = document.querySelector("#board");
      let count = 0;

      for (let column = 0; column < this.board.length; column++) {
        let columnContainer = document.createElement("div");
        columnContainer.className = 'columnContainer';
        columnContainer.id = `column-${column}`;
        this.boardElement.appendChild(columnContainer);
        for (let row = 0; row < this.board[column].length; row++) {
          let element = document.createElement("div");
          element.className = 'cell';
          element.id = `cell-${count}`;
          element.addEventListener("click", this.handleClickCell)
          count++;
          columnContainer.appendChild(element);
        }
      }
    }

    this.generateBoardMatrixByIdentifier = identifier => {
      return getGridDataBySize(this.gridSize, identifier)
    }

    this.init = () => {
      console.log("INIT UI")
      console.log(this.gridSizeElement, this.startButton)
      this.createEventListener(this.gridSizeElement, "input", this.handleGridSizeSubmit);
      this.createEventListener(this.startButton, "click", this.handleClickStart);
    }

    this.createEventListener = (element, actionType, callback) => {
      element.addEventListener(actionType, callback);
    }

    this.killEventListener = (element, actionType, callback) => {
      element.removeEventListener(actionType, callback);
    }

    this.handleClickStart = event => {
      // console.log(event);
      console.log('Starting game...')
      this.killEventListener(this.gridSizeElement, "input", this.handleGridSizeSubmit);

      const initialState = { board: this.board };
      this.state = new State(initialState);
    }

    this.handleGridSizeSubmit = event => {
      const gridSize = event.target.value;
      if (gridSize >= 3) {
        this.gridSize = gridSize;

        this.board = this.generateBoardMatrixByIdentifier('E');
        this.destroyBoardElementsByBoard()
        this.buildBoardElementsByBoardArr()

        // const fakeBoard = [['X', 'E', 'E'], ['X', 'E', 'E'], ['X', 'E', 'E']]
        // const fakeBoard = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        // const fakeBoard = [['X', 2, 3], [4, 'X', 6], [7, 8, 'X']]
        // const fakeBoard = [[1, 2, 'X'], [4, 'X', 6], ['X', 8, 9]]
        // const initialState = { board: fakeBoard };

        // GLOBALS.state = new State(initialState);

        // console.log('GLOABLS', GLOBALS)

        // const emptyCells = GLOBALS.state.getEmptyCellsInBoard();
        // console.log(emptyCells)

        // const isTerminal = GLOBALS.state.isTerminal();
        // console.log('is Terminal', isTerminal)
      }
    }

    this.handleClickCell = event => {
      const element = event.target;
      // TODO: Explain this logic
      const boardLength = this.board.length
      const row = Number(element.id.replace(/cell-/g, '')) % boardLength;
      const column = Number(element.parentNode.id.replace(/column-/g, '')) % boardLength;
      console.log('boardLength', boardLength)
      console.log('row', row)
      console.log('column', column)
      // board[row][column] = 'X';
      // console.log(board)
      this.insertSymbolInCell(element, 'X')
    }

    this.insertSymbolInCell = (cell, symbol) => {
      cell.innerHTML = symbol;
    }

    this.buildBoardElements = board => {
      // const boardElement = document.querySelector("#board");
      let count = 0;

      for (let column = 0; column < board.length; column++) {
        let columnContainer = document.createElement("div");
        columnContainer.className = 'columnContainer';
        columnContainer.id = `column-${column}`;
        this.boardElement.appendChild(columnContainer);
        for (let row = 0; row < board[column].length; row++) {
          let element = document.createElement("div");
          element.className = 'cell';
          element.id = `cell-${count}`;
          element.addEventListener("click", this.handleClickCell)
          count++;
          columnContainer.appendChild(element);
        }
      }
    }

  }
}