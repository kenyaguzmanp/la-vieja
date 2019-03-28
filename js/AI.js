import AIAction from './AIAction.js';

export default class AI {
  constructor({ level }) {

    this.levelOfIntelligence = level;

    this.game = {};

    /*
    * private recursive function that computes the minimax value of a game state
    * @param state [State] : the state to calculate its minimax value
    * @returns [Number]: the minimax value of the state
    */
    this.minimaxValue = state => {
      if (state.isTerminal()) {
        //a terminal game state is the base case
        // TODO: check and implement
        // return Game.score(state);
      }
      else {
        let stateScore = 0; // this stores the minimax value we'll compute
        if (state.turn === state.players[0]) {
          // X wants to maximize --> initialize to a value smaller than any possible score
          stateScore = -1000;
        } else {
          // O wants to minimize --> initialize to a value larger than any possible score
          stateScore = 1000;
        }
        const availablePositions = state.getEmptyCellsInBoard();
        //enumerate next available states using the info form available positions
        const availableNextStates = availablePositions.map(pos => {
          const action = new AIAction(pos);
          const nextState = action.applyTo(state);
          return nextState;
        });
        /* calculate the minimax value for all available next states
         * and evaluate the current state's value */
        availableNextStates.forEach(nextState => {
          const nextScore = this.minimaxValue(nextState);
          if (state.turn === state.players[0]) {
            // X wants to maximize --> update stateScore iff nextScore is larger
            if (nextScore > stateScore) {
              stateScore = nextScore;
            }
          }
          else {
            // O wants to minimize --> update stateScore iff nextScore is smaller
            if (nextScore < stateScore) {
              stateScore = nextScore;
            }
          }
        });
        return stateScore;
      }
    }
    this.insertAiPlayerInCell = (cell, turn) => {
      const { row, column } = cell;
      const selectedCell = document.querySelector(`#column-${column}`);
      const selectedRowId = `cell-${row}`;
      const nodes = selectedCell.childNodes;
      let cellElem = {};
      nodes.forEach((node, index) => {
        const id = `cell-${index}`
        if (id === selectedRowId) {
          cellElem = node;
        }
      })
      cellElem.innerHTML = turn;
    }
    /*
     * private function: make the ai player take a blind move
     * that is: choose the cell to place its symbol randomly
     * @param turn [String]: the player to play, either X or O
     */
    this.takeABlindMove = turn => {
      // console.log('%c taking a blind move...', 'color:blue;font-size:16px;')
      const available = this.game.currentState.getEmptyCellsInBoard();
      // TODO REFACTOR
      const randomCell = available[Math.floor(Math.random() * available.length)];

      const action = new AIAction({ pos: randomCell });
      const next = action.applyTo(this.game.currentState);

      this.insertAiPlayerInCell(randomCell, turn)

      this.game.advanceTo(next);
    }
    /*
     * public method to specify the game the ai player will play
     * @param _game [Game] : the game the ai will play
     */
    this.plays = _game => {
      this.game = _game;
    };
    /*
     * public function: notify the ai player that it's its turn
     * @param turn [String]: the player to play, either X or O
     */
    this.notify = turn => {
      // console.log('%c notifying', 'color:purple;font-size:16px;')
      switch (this.levelOfIntelligence) {
        //invoke the desired behavior based on the level chosen
        case "blind": this.takeABlindMove(turn); break;
        case "novice": this.takeANoviceMove(turn); break;
        case "master": this.takeAMasterMove(turn); break;
      }
    };

  }
}