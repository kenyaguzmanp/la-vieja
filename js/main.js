// import State from './State.js';
// import Game from './Game.js';
import UI from './UI.js';

const GLOBALS = {}

// Immediately-invoked Function Expression (IIFE)
void function () {
	const startButton = document.querySelector("#start");
	const gridSizeElement = document.querySelector("#gridSize");
	const boardElement = document.querySelector("#board");

	const player1Element = document.querySelector("#player-0");
	const player2Element = document.querySelector("#player-1");

	const players = [player1Element, player2Element];

	const UIModel = new UI({ boardElement, startButton, gridSizeElement, players });
	UIModel.init();

	GLOBALS.UI = UIModel;

	console.log('GLOBALS', GLOBALS)

}();