// Sets begining parameters: x starts, message reflects this
function startGame() {
  for (var i = 1; i <= 9; i = i + 1) {
    clearBox(i);
  }
  if (Math.random() < 0.5) {
    document.turn = "O"
  }
  else {document.turn = "X";}
  document.winner = null;
  setMessage(document.turn + " gets to start.");
}
//Message function
function setMessage(msg) {
//finds ID "messages" within HTML
  document.getElementById("messages").innerText = msg;
}
//Sets turn
function nextMove(field) {
  if (document.winner != null) {
    setMessage(document.winner + " already won the game. Click Start New Game to play again")
  }
//Allows move if filed is empty on click, swithces turn if clicked
  else if (field.innerText == '') {
  field.innerText = document.turn;
  switchTurn();
  }else{
//Notifies user if filed is already taken
    setMessage("That square is already used.");
  }
}
//Turn function
function switchTurn() {
//Notifies user upon win
  if(winCheck(document.turn)) {
    setMessage(document.turn + " Wins!");
    document.winner = document.turn
  }
  else if(document.turn == "X") {
    document.turn = "O";
    setMessage("It's " + document.turn + "'s turn!");
  } else {
    document.turn = "X";
    setMessage("It's " + document.turn + "'s turn!");
  }
}
function winCheck(move) {
  var result = false;
  if (
//Rows
      checkRow(1, 2, 3, move) ||
      checkRow(4, 5, 6, move) ||
      checkRow(7, 8, 9, move) ||
//Columns
      checkRow(1, 4, 7, move) ||
      checkRow(2, 5, 8, move) ||
      checkRow(3, 6, 9, move) ||
//Diagonals
      checkRow(1, 5, 9, move) ||
      checkRow(3, 5, 7, move)) {
        result = true;
      }
    return result;
}
function checkRow(a, b, c, move){
  var result = false;
  if (getBox(a) == move && getBox(b) == move && getBox(c) == move){
    result = true;
  }
  return result;
}
function getBox(number) {
  return document.getElementById("f" + number).innerText;
}
function clearBox () {
  document.getElementById("f" + number).innerText = "";
}
