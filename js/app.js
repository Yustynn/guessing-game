// I tried out the Mammals spec, and figured this would be good practice.

function Game() {
  // randomly generate answer
  this.answer = Math.ceil(Math.random() * 100);
  // initialize guesses left to 5
  this.numGuessesLeft = 5;

  // store references to nodes (for speed)
  this.guessElement = $('#guessbox');
  this.numGuessesLeftNode = $('#num-guesses');

  // reset displayed guesses left to 5
  this.updateNumGuessesDisplay();
}

// return value of guess
Game.prototype.retrieveGuess = function() {
  console.log(this.guessElement.val());
  return this.guessElement.val();
};

// return true/false for if guess is correct
Game.prototype.correctGuess = function() {
  return this.retrieveGuess() == this.answer;
};

// update only displayed guesses left
Game.prototype.updateNumGuessesDisplay = function() {
  this.numGuessesLeftNode.text(this.numGuessesLeft);
};

// update guesses left. Return lose() if no more guesses left.
Game.prototype.minusGuess = function() {
  this.numGuessesLeft--;
  this.updateNumGuessesDisplay();
  if (this.numGuessesLeft == 0)
    return this.lose();
};

// return win() if correct guess. Return minusGuess() if wrong guess.
Game.prototype.turn = function() {
  if (this.correctGuess())
    return this.win();
  else
    this.minusGuess();
};

// tell the player the good news
Game.prototype.win = function() {
  alert('YOU WIN!');
};

// tell the player to suck it
Game.prototype.lose = function() {
  alert('YOU LOSE! The right answer was ' + this.answer);
};

$(document).ready(function() {
  var game = new Game;

  $('#submit-guess').on('click', function(e) {
    e.preventDefault(); // Just in case
    game.turn();
  });

  $('#restart').on('click', function(e) {
    e.preventDefault();
    game = new Game;
  })
});
