// I tried out the Mammals spec, and figured making the game
// this way would be good practice.

$(document).ready(function() {
  // store references to nodes (for speed)
  var guessedElement = $('#guessed');
  var guessElement = $('#guessbox');
  var numGuessesLeftNode = $('#num-guesses');
  var relativeTempElement = $('#relative-temp');
  var higherLowerElement = $('#higher-lower');

  function Game() {
    // randomly generate answer
    this.answer = Math.ceil(Math.random() * 100);
    // initialize guesses left to 5
    this.numGuessesLeft = 5;
    this.guesses = [];

    // Clear previous input
    guessedElement.html('Guessed: ');
    relativeTempElement.html('');
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


  // Return true if guess is hotter, false if guess is colder
  Game.prototype.guessIsHotter = function() {
    var prevGuess = this.guesses[this.guesses.length - 2];
    return Math.abs(prevGuess - this.answer) >= Math.abs(this.guess - this.answer);
  };

  // Return true if guess is hot (<=20 from answer), false if guess is cold (>20 from answer)
  Game.prototype.guessIsHot = function() {
    return Math.abs(this.guess - this.answer) <= 20;
  }

  // Adds guess to HTML
  Game.prototype.displayGuess = function() {
    var guessSpan = $('<span>' + this.guess + '</span>');
    if (this.guessIsHot())
      guessSpan.addClass('hot');
    else
      guessSpan.addClass('cold');

    guessedElement.append(guessSpan);
  };

  Game.prototype.displayRelativeTemp = function() {
    if (this.guesses.length > 1) {
      if (this.guessIsHotter())
        relativeTempElement.html('Hotter!');
      else
        relativeTempElement.html('Colder!');
    }
  };

  // Prompt user on how to guess next
  Game.prototype.displayHigherLower = function() {
    if (this.guess < this.answer)
      higherLowerElement.html('Guess Higher!');
    else if (this.guess > this.answer)
      higherLowerElement.html('Guess Lower!');
    else
      higherLowerElement.html('Just right!');
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
    if (!this.guess) {
      alert('Fill in a number between 1 and 100!');
      return false;
    }
    if (!Number(this.guess)) {
      alert('Use your numbers, not your words');
      return false;
    }
    if (this.guess > 100 || this.guess < 1) {
      alert('Guess within 1 and 100!');
      return false;
    }
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
    if (this.gameOver)
      return;

    this.retrieveGuess();
    if (!this.validGuess())
      return;
    this.storeGuess();
    this.displayGuess();
    this.displayRelativeTemp();
    this.displayHigherLower();

    if (this.correctGuess())
      return this.win();
    else
      this.minusGuess();
  };

  // tell the player the good news
  Game.prototype.win = function() {
    alert('YOU WIN!');
    this.gameOver = true;
  };

  // tell the player to suck it
  Game.prototype.lose = function() {
    alert('YOU LOSE! The right answer was ' + this.answer);
    this.gameOver = true;
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
  // (assignment requirement didn't specify which element)
  $(document).on('keydown', function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      game.turn();
    }
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
