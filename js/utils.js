// Transpose a Matrix
export const transpose = a => {
  // Calculate the width and height of the Array
  var w = a.length || 0;
  var h = a[0] instanceof Array ? a[0].length : 0;
  // In case it is a zero matrix, no transpose routine needed.
  if (h === 0 || w === 0) { return []; }
  /**
   * @var {Number} i Counter
   * @var {Number} j Counter
   * @var {Array} t Transposed data is stored in this array.
   */
  var i, j, t = [];
  // Loop through every item in the outer array (height)
  for (i = 0; i < h; i++) {
    // Insert a new row (array)
    t[i] = [];
    // Loop through every item per item in outer array (width)
    for (j = 0; j < w; j++) {

      // Save transposed data.
      t[i][j] = a[j][i];
    }
  }
  return t;
}

export const getDiagonal = matrix => {
  const diagonal = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (i === j) {
        diagonal.push(matrix[i][j])
      }
    }
  }
  return diagonal;
}

export const getAntiDiagonal = matrix => {
  const antiDiagonal = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (i + j === matrix.length - 1) {
        antiDiagonal.push(matrix[i][j])
      }
    }
  }
  return antiDiagonal;
}