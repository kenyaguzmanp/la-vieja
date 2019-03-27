import State from './State.js';

export default class Game {
  constructor({ autoPlayer }) {

    this.ai = autoPlayer;

    // initial state as empty
    this.currentState = new State();


  }
}