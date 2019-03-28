import State from './State.js';
import Game from './Game.js';
import AI from './AI.js';
import { getGridDataBySize } from './utils.js'

export default class UI {
  constructor({ boardElement = {}, startButton = {}, gridSizeElement = {}, board = [], players = ['X', 'O'] }) {

    this.game = {};

    this.playersElements = players;

    this.players = {};

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

    this.handleOnChangePlayer = event => {
      const element = event.target;
      const index = Number(element.id.replace(/player-/g, ''))
      const value = element.value;
      this.players[index] = value;
      console.log('this.player', this.players)
    }

    this.init = () => {
      console.log("INIT UI")
      this.createEventListener(this.gridSizeElement, "input", this.handleGridSizeSubmit);
      this.createEventListener(this.startButton, "click", this.handleClickStart);

      const players = [];
      this.playersElements.forEach(element => {
        this.createEventListener(element, "input", this.handleOnChangePlayer);
        players.push(element.value)
      })

      this.players = players;

      console.log('players', this.players)

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

      this.playersElements.forEach(element => {
        this.killEventListener(element, "input", this.handleOnChangePlayer);
      })


      this.addClassToAllCells('activeCell')

      // Create Click events on Cells
      this.createEventListenerForCells();

      // Initial State
      const initialState = { turn: this.players[0], board: this.board, result: "still running", players: this.players };
      this.state = new State(initialState);

      // Define Artificial Intelligence
      // TODO: modfify level of intelligence
      const aiPlayer = new AI({ level: 'blind' });

      // Create Game instance
      // Initialize Game
      this.game = new Game({ autoPlayer: aiPlayer, initialState: this.state });
      aiPlayer.plays(this.game);

      // console.log('AI', aiPlayer)

      this.game.start();

    }

    this.handleGridSizeSubmit = event => {
      const gridSize = event.target.value;
      if (gridSize >= 3) {
        this.gridSize = gridSize;

        this.board = this.generateBoardMatrixByIdentifier('E');
        this.destroyBoardElementsByBoard()
        this.buildBoardElementsByBoardArr()

      }
    }

    this.handleClickCell = event => {
      const element = event.target;
      // TODO: Explain this logic
      const boardLength = this.board.length
      const row = Number(element.id.replace(/cell-/g, '')) % boardLength;
      const column = Number(element.parentNode.id.replace(/column-/g, '')) % boardLength;

      // if is an empty cell and its not over the game
      if (this.game.status === "running" && this.board[row][column] === 'E') {
        this.insertSymbolInCell(element, this.game.currentState.turn);

        const nextState = new State(this.game.currentState);

        // Mutate board matrix with value of player
        nextState.board[row][column] = nextState.turn;
        console.log('Inserting X in UI');

        nextState.advanceTurn();
        this.game.advanceTo(nextState);

      }

    }

    this.insertSymbolInCell = (cell, symbol) => {
      cell.innerHTML = symbol;
    }

    this.createEventListenerForCells = () => {
      const columns = this.boardElement.childNodes;
      columns.forEach(cell => {
        const cells = cell.childNodes;
        cells.forEach(node => {
          this.createEventListener(node, "click", this.handleClickCell)
        })
      })
    }

    this.addClassToCell = (cellElement, className) => {
      cellElement.classList.add(className)
    }

    this.addClassToAllCells = className => {
      const columns = this.boardElement.childNodes;
      columns.forEach(cell => {
        const cells = cell.childNodes;
        cells.forEach(node => {
          this.addClassToCell(node, className)
        })
      })
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
          count++;
          columnContainer.appendChild(element);
        }
      }
    }

  }
}