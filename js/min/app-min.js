$(document).ready(function(){function e(){this.answer=Math.ceil(100*Math.random()),this.numGuessesLeft=5,this.updateNumGuessesDisplay()}var t=$("#guessbox"),s=$("#num-guesses");e.prototype.retrieveGuess=function(){return console.log(t.val()),t.val()},e.prototype.correctGuess=function(){return this.retrieveGuess()==this.answer},e.prototype.updateNumGuessesDisplay=function(){s.text(this.numGuessesLeft)},e.prototype.minusGuess=function(){return this.numGuessesLeft--,this.updateNumGuessesDisplay(),0==this.numGuessesLeft?this.lose():void 0},e.prototype.turn=function(){return this.correctGuess()?this.win():void this.minusGuess()},e.prototype.win=function(){alert("YOU WIN!")},e.prototype.lose=function(){alert("YOU LOSE! The right answer was "+this.answer)},e.prototype.giveHint=function(){alert("Here's a hint: the answer's "+this.answer)};var n=new e;$("#submit-guess").on("click",function(e){e.preventDefault(),n.turn()}),$("#guessbox").on("keyup",function(e){e.preventDefault(),13==e.keyCode&&n.turn()}),$("#request-hint").on("click",function(e){e.preventDefault(),n.giveHint()}),$("#restart").on("click",function(t){t.preventDefault(),n=new e})});