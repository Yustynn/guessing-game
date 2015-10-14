// I tried out the Mammals spec, and figured making the game
// this way would be good practice.

$(document).ready(function() {
  // store references to nodes (for speed)
  var guessedElement = $('#guessed');
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

  // Store guess in game object and display guess to user
  Game.prototype.storeGuess = function() {
    // store internally
    this.guesses.push(this.guess);
  };


  // Return true if guess is hot, false if guess is cold
  Game.prototype.guessIsHot = function() {
    var prevGuess = this.guesses[this.guesses.length - 2];

    return Math.abs(prevGuess - this.answer) >= Math.abs(this.guess - this.answer);
  };

  // Adds guess to HTML
  Game.prototype.displayGuess = function() {
    var guessSpan = $('<span>' + this.guess + '</span>');

    // add class to indicate guess temperature
    if (this.guesses.length > 1) {
      if (this.guessIsHot())
        guessSpan.addClass('hot');
      else
        guessSpan.addClass('cold');
    }

    guessedElement.append(guessSpan);
  };

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
  };

  // return win() if correct guess. Return minusGuess() if wrong guess.
  Game.prototype.turn = function() {
    this.retrieveGuess();
    if (!this.validGuess())
      return;
    this.storeGuess();
    this.displayGuess();
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
  });
});
