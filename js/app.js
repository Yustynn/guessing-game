// I tried out the Mammals spec, and figured making the game
// this way would be good practice.

$(document).ready(function() {
  // store references to elements (for speed)
  var guessedElement = $('#guessed'),
    guessElement = $('#guessbox'),
    scorebox = $('#scorebox'),
    numGuessesLeftElement = $('#num-guesses'),
    relativeTempElement = $('#relative-temp'),
    higherLowerElement = $('#higher-lower');

  // Construct new game object, clear previous input
  function Game() {
    // randomly generate answer
    this.answer = Math.ceil(Math.random() * 100);
    // initialize guesses left to 5
    this.numGuessesLeft = 5;
    this.guesses = [];

    // clear previous input
    guessedElement.html('Guessed: ');
    relativeTempElement.html('');
    scorebox.html("<span id='num-guesses'>5</span> Guesses Left!");
    scorebox.css('background-color', '');
    // reset displayed guesses left to 5
    this.updateNumGuessesDisplay();
  };

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

  // Tells the user whether they're closer or further away from the answer
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
    numGuessesLeftElement.text(this.numGuessesLeft);
  };

  // update guesses left. Return lose() if no more guesses left.
  Game.prototype.minusGuess = function() {
    this.numGuessesLeft--;
    this.updateNumGuessesDisplay();
    if (this.numGuessesLeft == 0)
      return this.lose();
  };

  // deliver on the goods
  Game.prototype.cheatCodeChecker = function() {
    if (this.guess == 'inittowinit') {
      this.win();
      return true;
    }
    if (this.guess == 'youcantalwaysgetwhatyouwant') {
      this.lose();
      return true;
    }
    return false
  }

  // return boolean for if guess is 1) not a repeat AND 2) a number between 1-100
  Game.prototype.validGuess = function() {
    // Alert if guess isn't a number
    if (!Number(this.guess)) {
      guessElement.val('Use numbers!');
      return false;
    }
    // Alert if no guess content
    if (!this.guess) {
      guessElement.val('Fill in a number between 1 and 100!');
      return false;
    }
    // Alert if number is out of range
    if (this.guess > 100 || this.guess < 1) {
      guessElement.val('Guess within 1 and 100!');
      return false;
    }
    // Alert if guessed already
    if (this.guesses.indexOf(this.guess) != -1) {
      guessElement.val('You already guessed ' + this.guess + '!');
      return false;
    }

    // valid guess
    return true;
  };

  // run through the turn sequence
  Game.prototype.turn = function() {
    // don't play if the game's over
    if (this.gameOver)
      return;

    this.retrieveGuess();
    // if cheats are entered or guess is invalid, end the turn
    if (this.cheatCodeChecker() || !this.validGuess())
      return;

    this.storeGuess();

    // give the user feedback
    this.displayGuess();
    this.displayRelativeTemp();
    this.displayHigherLower();

    // either win or minus a guess. minusGuess() calls lose() if needed.
    if (this.correctGuess())
      return this.win();
    else
      this.minusGuess();
  };

  // tell the player the good news
  Game.prototype.win = function() {
    scorebox.html('You WIN! Congratulations!');
    scorebox.css('background-color', 'green');
    this.gameOver = true;
  };

  // tell the player to suck it
  Game.prototype.lose = function() {
    scorebox.html('YOU LOSE! The right answer was ' + this.answer);
    scorebox.css('background-color', 'red');
    this.gameOver = true;
  };

  // tell the player the answer
  Game.prototype.giveHint = function() {
    guessElement.val('PSST! Try ' + this.answer);
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
