$(document).ready(function(){function s(){this.answer=Math.ceil(100*Math.random()),this.numGuessesLeft=5,this.guesses=[],e.html("Guessed: "),i.html(""),this.updateNumGuessesDisplay()}var e=$("#guessed"),t=$("#guessbox"),u=$("#num-guesses"),i=$("#relative-temp");s.prototype.retrieveGuess=function(){this.guess=t.val()},s.prototype.storeGuess=function(){this.guesses.push(this.guess)},s.prototype.guessIsHotter=function(){var s=this.guesses[this.guesses.length-2];return Math.abs(s-this.answer)>=Math.abs(this.guess-this.answer)},s.prototype.guessIsHot=function(){return Math.abs(this.guess-this.answer)<=20},s.prototype.displayGuess=function(){var s=$("<span>"+this.guess+"</span>");this.guessIsHot()?s.addClass("hot"):s.addClass("cold"),e.append(s)},s.prototype.displayRelativeTemp=function(){this.guesses.length>1&&(this.guessIsHotter()?i.html("Hotter!"):i.html("Colder!"))},s.prototype.correctGuess=function(){return this.guess==this.answer},s.prototype.updateNumGuessesDisplay=function(){u.text(this.numGuessesLeft)},s.prototype.minusGuess=function(){return this.numGuessesLeft--,this.updateNumGuessesDisplay(),0==this.numGuessesLeft?this.lose():void 0},s.prototype.validGuess=function(){return-1!=this.guesses.indexOf(this.guess)?(alert("You already guessed "+this.guess+"!"),!1):!0},s.prototype.turn=function(){return this.retrieveGuess(),this.validGuess()?(this.storeGuess(),this.displayGuess(),this.displayRelativeTemp(),this.correctGuess()?this.win():void this.minusGuess()):void 0},s.prototype.win=function(){alert("YOU WIN!")},s.prototype.lose=function(){alert("YOU LOSE! The right answer was "+this.answer)},s.prototype.giveHint=function(){alert("Here's a hint: the answer's "+this.answer)};var n=new s;$("#submit-guess").on("click",function(s){s.preventDefault(),n.turn()}),$(document).on("keydown",function(s){13==s.keyCode&&(s.preventDefault(),n.turn())}),$("#request-hint").on("click",function(s){s.preventDefault(),n.giveHint()}),$("#restart").on("click",function(e){e.preventDefault(),n=new s})});