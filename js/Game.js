import State from './State.js';

export default class Game {
  constructor({ autoPlayer = {}, initialState = {} }) {

    this.ai = autoPlayer;

    this.status = "beginning";

    this.currentState = initialState;


    this.advanceTo = _state => {
      console.log('_state in advanceTo', _state)
      const isTerminal = _state.isTerminal();
      if (isTerminal) {
        console.log(_state.status, _state.result)
      } else {
        if (_state.turn === 'X') {
          // TODO: call to modify UI
          console.log('X turn')
        } else {
          // TODO: call to modify UI
          console.log('0 turn')
        }
      }

      // TODO: check
      // Modify game state
      this.currentState = _state;
    }

    this.start = () => {
      if (this.status === "beginning") {
        //invoke advanceTo with the initial state
        this.advanceTo(this.currentState);
        this.status = "running";
      }
    }


  }
}