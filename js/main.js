// import State from './State.js';

const init = () => {
	console.log("Ready to play La Vieja?");
	buildButtonEvents();
}

const getGridDataBySize = (size, identifier) => {
	const grid = [];
	for (let row = 0; row < size; row++) {
		let rowArr = [];
		for (let column = 0; column < size; column++) {
			if (identifier === undefined) {
				rowArr.push(column);
			} else {
				rowArr.push(identifier);
			}
		};
		grid.push(rowArr);
	}
	return grid;
}

const buildBoardElementsByBoardArr = board => {
	const boardElement = document.querySelector("#board");
	let count = 0;

	for (let column = 0; column < board.length; column++) {
		let columnContainer = document.createElement("div");
		columnContainer.className = 'columnContainer';
		columnContainer.id = `column-${column}`;
		boardElement.appendChild(columnContainer);
		for (let row = 0; row < board[column].length; row++) {
			let element = document.createElement("div");
			element.className = 'cell';
			element.id = `cell-${count}`;
			element.addEventListener("click", handleClickCell)
			count++;
			columnContainer.appendChild(element);
		}
	}
}

const destroyBoardElementsByBoard = () => {
	const cells = document.querySelectorAll(".cell");
	if (cells.length > 0) {
		for (let index = 0; index < cells.length; index++) {
			cells[index].parentNode.removeChild(cells[index]);
		}
	}
}

const handleClickCell = event => {
	const element = event.target;
	// console.log(event.target.id)
	insertSymbolInCell(element, 'X')
}

const insertSymbolInCell = (cell, symbol) => {
	cell.innerHTML = symbol;
}

const handleGridSizeSubmit = event => {
	const gridSize = event.target.value;
	if (gridSize >= 3) {
		const boardData = getGridDataBySize(gridSize)
		destroyBoardElementsByBoard()
		buildBoardElementsByBoardArr(boardData)
	}

}

const buildButtonEvents = () => {
	const gridSizeElement = document.querySelector("#gridSize");

	gridSizeElement.addEventListener("input", handleGridSizeSubmit);

}

const handleClickStart = event => {
	// console.log(event);
	const gridSizeElement = document.querySelector("#gridSize");
	gridSizeElement.removeEventListener("input", handleGridSizeSubmit);
}


// Immediately-invoked Function Expression (IIFE)
void function () {
	const startButton = document.querySelector("#start");
	startButton.addEventListener("click", handleClickStart);
	init();
}();