// import State from './State.js';
// import Game from './Game.js';
import UI from './UI.js';

const GLOBALS = {}

// Immediately-invoked Function Expression (IIFE)
void function () {
	const startButton = document.querySelector("#start");
	const gridSizeElement = document.querySelector("#gridSize");
	const boardElement = document.querySelector("#board");

	const UIModel = new UI({ boardElement, startButton, gridSizeElement });
	UIModel.init();

	GLOBALS.UI = UIModel;

	console.log('GLOBALS', GLOBALS)

}();