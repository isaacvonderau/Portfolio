// // Sets begining parameters: x starts, message reflects this
// function startGame() {
//   for (var i = 1; i <= 9; i = i + 1) {
//     clearBox(i);
//   }
//   if (Math.random() < 0.5) {
//     document.turn = "O"
//   }
//   else {document.turn = "X";}
//   document.winner = null;
//   setMessage(document.turn + " gets to start.");
// }
// //Message function
// function setMessage(msg) {
// //finds ID "messages" within HTML
//   document.getElementById("messages").innerText = msg;
// }
// //Sets turn
// function nextMove(field) {
//   if (document.winner != null) {
//     setMessage(document.winner + " already won the game. Click Start New Game to play again")
//   }
// //Allows move if filed is empty on click, swithces turn if clicked
//   else if (field.innerText == '') {
//   field.innerText = document.turn;
//   switchTurn();
//   }else{
// //Notifies user if filed is already taken
//     setMessage("That square is already used.");
//   }
// }
// //Turn function
// function switchTurn() {
// //Notifies user upon win
//   if(winCheck(document.turn)) {
//     setMessage(document.turn + " Wins!");
//     document.winner = document.turn
//   }
//   else if(document.turn == "X") {
//     document.turn = "O";
//     setMessage("It's " + document.turn + "'s turn!");
//   } else {
//     document.turn = "X";
//     setMessage("It's " + document.turn + "'s turn!");
//   }
// }
// function winCheck(move) {
//   var result = false;
//   if (
// //Rows
//       checkRow(1, 2, 3, move) ||
//       checkRow(4, 5, 6, move) ||
//       checkRow(7, 8, 9, move) ||
// //Columns
//       checkRow(1, 4, 7, move) ||
//       checkRow(2, 5, 8, move) ||
//       checkRow(3, 6, 9, move) ||
// //Diagonals
//       checkRow(1, 5, 9, move) ||
//       checkRow(3, 5, 7, move)) {
//         result = true;
//       }
//     return result;
// }
// function checkRow(a, b, c, move){
//   var result = false;
//   if (getBox(a) == move && getBox(b) == move && getBox(c) == move){
//     result = true;
//   }
//   return result;
// }
// function getBox(number) {
//   return document.getElementById("f" + number).innerText;
// }
// function clearBox () {
//   document.getElementById("f" + number).innerText = "";
// }


var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [6,4,2]
]
const field = document.querySelectorAll('.field');
function startGame() {
  // document.querySelector(".endgame").style.display = 'none';
  origBoard = Array.from(Array(9).keys());
  for (var i = 0; i < field.length; i++ ) {
    field[i].innerText = '';
    field[i].style.removeProperty('background-color');
    field[i].addEventListener('click', turnClick, false)
  }
}

function turnClick(square) {
  if (typeof origBoard[square.target.id] == "number") {
    turn(square.target.id, huPlayer)
    if (!checkTie()) turn(bestSpot(), aiPlayer);
  }
 
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player)
  if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = {index: index, player: player};
        break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "blue" : "red";
  }
  for (var i = 0; i < field.length; i++) {
    field[i].removeEventListener("click", turnClick, false)
  }
  declareWinner(gameWon.player == huPlayer ? "You win!" : "You Lose!")
}

function declareWinner(who) {
  document.querySelector(".endGame").style.display = "block";
  document.querySelector(".endGame .text").innerText = who;

}

function emptySquares() {
  return origBoard.filter(s => typeof s == "number");
}

function bestSpot() {
  return emptySquares()[0];
}

function checkTie() {
  if (emptySquares().length == 0) {
    for (var i = 0; i < field.length; i++) {
      field[i].style.backgroundColor = "green";
      field[i].removeEventListener("click", turnClick, false);
    }
    declareWinner("Tie Game!")
    return true;
  }
  return false;
}
