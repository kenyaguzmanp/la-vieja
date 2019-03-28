import State from './State.js';

export default class AIAction {
  constructor({ pos }) {
    // public : the position on the board that the action would put the letter on
    this.movePosition = pos;
    //public : the minimax value of the state that the action leads to when applied
    this.minimaxVal = 0;
    /*
     * public : applies the action to a state to get the next state
     * @param state [State]: the state to apply the action to
     * @return [State]: the next state
     */
    this.applyTo = state => {
      // console.log('Applying cell to state, cell', this.movePosition)
      const next = new State(state);

      const { row, column } = this.movePosition;
      //put the letter on the board
      next.board[row][column] = state.turn;
      if (state.turn === state.players[1]) {
        next.oMovesCount++;
      }

      next.advanceTurn();

      // console.log('next state', next)
      return next;
    };
    /*
    * public static function that defines a rule for sorting AIActions in ascending manner
    * @param firstAction [AIAction] : the first action in a pairwise sort
    * @param secondAction [AIAction]: the second action in a pairwise sort
    * @return [Number]: -1, 1, or 0
    */
    this.ASCENDING = (firstAction, secondAction) => {
      if (firstAction.minimaxVal < secondAction.minimaxVal)
        return -1; //indicates that firstAction goes before secondAction
      else if (firstAction.minimaxVal > secondAction.minimaxVal)
        return 1; //indicates that secondAction goes before firstAction
      else
        return 0; //indicates a tie
    };
    /*
     * public static function that defines a rule for sorting AIActions in descending manner
     * @param firstAction [AIAction] : the first action in a pairwise sort
     * @param secondAction [AIAction]: the second action in a pairwise sort
     * @return [Number]: -1, 1, or 0
     */
    this.DESCENDING = (firstAction, secondAction) => {
      if (firstAction.minimaxVal > secondAction.minimaxVal)
        return -1; //indicates that firstAction goes before secondAction
      else if (firstAction.minimaxVal < secondAction.minimaxVal)
        return 1; //indicates that secondAction goes before firstAction
      else
        return 0; //indicates a tie
    };
  }
}