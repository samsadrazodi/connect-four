/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById('board');
  // TODO: add comment for this code

  const top = document.createElement("tr");              // Creating table row element
  top.setAttribute("id", "column-top");                  //setting its id to 'column-top'
  top.addEventListener("click", handleClick);            // adding an event listener for click on the table top (top row of the board)

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");       //creating table data cell element
    headCell.setAttribute("id", x);                      // setting an id for each element. (0 to 6) 7 columns
    top.append(headCell);                                // appending it to top row 
  }
  board.append(top);                                    // appending top row and its cells to board

  // TODO: add comment for this code

  for (var y = 0; y < HEIGHT; y++) {                    // in each col starting from 0
    const row = document.createElement("tr");           // create a row element
    for (var x = 0; x < WIDTH; x++) {                   // go through the row
      const cell = document.createElement("td");        // create a cell
      cell.setAttribute("id", `${y}-${x}`);             // give cell an id. i.e starting 0-0 at bottom left corner of board
      row.append(cell);                                 // append cell
    }
    board.append(row);                                  //append row to board (end of for loop creates 7 rows 7 cols on board)
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //return 0;
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');                 // create a div (circle div)
  const spot = document.getElementById(`${y}-${x}`);           // position the div on the board
  piece.classList.add('piece');                                // add class piece to style in css file
  piece.classList.add(`p${currPlayer}`);                       // add class currPlayer
  piece.classList.add(`drop${y + 1}`);                         // add lass drop with a number for animation in css file
  spot.append(piece);                                          // append the piece to the position (spot) on board
}

/** endGame: announce game end */

function endGame(msg) {                                        // function for alert at the end of game
  // TODO: pop up alert message
  alert(msg);

}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {                                  // function for click when the player clicks on a top column cell
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);                              // checks if the column is null or filled. if filled entirely, ignores click
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;                                 //sets the current player's cell position on board
  placeInTable(y, x);                                       // passes the y , x to placeInTable function to create the piece on board

  // check for win
  if (checkForWin()) {                                      //checks if the checkForWin() is true, if so, alert the winner!
    return endGame(`Player ${currPlayer} won!`);

  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(boardRow => boardRow.every(cell => cell))) {               // check if every row of the board is filled, this could only mean that there was a tie!
    return endGame('Players Tied!');                                         // return tie message to the endGame() to alert!
  }





  //currPlayerDiv.classList.remove(`player${currPlayer}`)
  // switch players
  // TODO: switch currPlayer 1 <-> 2

  currPlayer = currPlayer === 1 ? 2 : 1;                            // to switch currPlayer


  // to change the color of the text of Player 1 and Player 2 based on the currPlayer so users know whose turn it is.
  if (currPlayer === 1) {

    player2.classList.remove('player2after');
    player1.classList.add('player1after')

  } else {
    player1.classList.remove('player1after')
    player2.classList.add('player2after')
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.               

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];              // Winning horizontally requires 4 pieces in on row (x,x+1,x+2,x+3)
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];               // winning vertically required 4 pieces in on col (y,y+1,y+2,y+3)
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // winning b diagonally to the right up 1, right 1
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // winning diagonally to the left up 1 left 1

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {       // checking if any of the conditions are met
        return true;                                                         // return true if any of them are met to return the winner!
      }
    }
  }
}

// To reset the game I simply refresh the page!
function refreshPage() {
  window.location.reload();
}

makeBoard();
makeHtmlBoard();
