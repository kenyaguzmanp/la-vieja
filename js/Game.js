import State from './State.js';

export default class Game {
  constructor({ autoPlayer = {}, initialState = {} }) {

    this.ai = autoPlayer;

    this.status = "beginning";

    this.currentState = initialState;


    this.advanceTo = _state => {
      // console.log('%c _state in advanceTo', 'color:green;font-size:16px;', _state)
      // Modify game state
      this.currentState = _state;
      const isTerminal = _state.isTerminal();
      if (isTerminal) {
        // Modify game status
        this.status = "ended"
        console.log(_state.status, _state.result)
      } else {
        if (_state.turn === _state.players[0]) {
          // TODO: call to modify UI
          console.log(`${_state.turn} turn`)
        } else {
          // TODO: call to modify UI
          console.log(`${_state.turn} turn`)
          this.ai.notify(_state.players[1]);
        }
      }

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