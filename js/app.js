// I tried out the Mammals spec, and figured making the game
// this way would be good practice.

$(document).ready(function() {
  // store references to nodes (for speed)
  var guessElement = $('#guessbox');
  var numGuessesLeftNode = $('#num-guesses');

  function Game() {
    // randomly generate answer
    this.answer = Math.ceil(Math.random() * 100);
    // initialize guesses left to 5
    this.numGuessesLeft = 5;
    this.guesses = [];

    // reset displayed guesses left to 5
    this.updateNumGuessesDisplay();
  }

  // return value of guess
  Game.prototype.retrieveGuess = function() {
    this.guess = guessElement.val();
  };

  Game.prototype.storeGuess = function() {
    this.guesses.push(this.guess);
  }

  // return boolean for if guess is correct
  Game.prototype.correctGuess = function() {
    return this.guess == this.answer;
  };

  // update display for guesses left
  Game.prototype.updateNumGuessesDisplay = function() {
    numGuessesLeftNode.text(this.numGuessesLeft);
  };

  // update guesses left. Return lose() if no more guesses left.
  Game.prototype.minusGuess = function() {
    this.numGuessesLeft--;
    this.updateNumGuessesDisplay();
    if (this.numGuessesLeft == 0)
      return this.lose();
  };

  // return boolean for if guess is 1) not a repeat AND 2) a number between 1-100
  Game.prototype.validGuess = function() {
    // Alert if guessed already
    if (this.guesses.indexOf(this.guess) != -1) {
      alert('You already guessed ' + this.guess + '!');
      return false;
    }
    // Alert if not a number / if number > 100 || < 0
    // TO-DO

    return true;
  }


  // return win() if correct guess. Return minusGuess() if wrong guess.
  Game.prototype.turn = function() {
    this.retrieveGuess();
    if (!this.validGuess())
      return;
    this.storeGuess();
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

  // tell the player the answer
  Game.prototype.giveHint = function() {
    alert("Here's a hint: the answer's " + this.answer);
  }

  var game = new Game;

  // Initiate turn on button guess submission
  $('#submit-guess').on('click', function(e) {
    e.preventDefault(); // Just in case
    game.turn();
  });

  // Initiate turn on enter key guess submission
  $('#guessbox').on('keyup', function(e) {
    e.preventDefault(); // Just in case
    if (e.keyCode == 13)
      game.turn();
  });

  // Give answer on hint request
  $('#request-hint').on('click', function(e) {
    e.preventDefault();
    game.giveHint();
  });

  // New game on restart button click
  $('#restart').on('click', function(e) {
    e.preventDefault();
    game = new Game;
  })
});
