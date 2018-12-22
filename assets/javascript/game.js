// Game object

var words = ["one", "two", "three"];
var currentWordIndex = 0;
var attempts = 0;
var guesses = [];

function onStart() {
    document.getElementById("game_board").innerHTML = words[0].split("").map(() => "_").join("");
}
function getGuessesAllowed() {
    return (words[currentWordIndex].length * 3);
}
function logStuff(event) {
    console.log(event.key);
}
function onGuess(event) {

    var keyPressed = event.key;
    guesses.push(keyPressed);
    var gameboardWord = currentWordLetters().map(function (letter) {
        if (guesses.indexOf(letter) === -1) {
            return "_";
        } else {
            return letter;
        }
    }
    );
    attempts++;
    document.getElementById("guesses_remaining").innerHTML = getGuessesAllowed() - attempts;
    document.getElementById("game_board").innerHTML = gameboardWord.join("");
    
    if (getGuessesAllowed() - attempts === 0 || gameboardWord.indexOf("_") === -1) {
        goToNextWord();
    }
    

    console.log("keyPressed is: " + keyPressed)
    console.log("guesses: " + guesses);
    console.log(gameboardWord.join(""));


}

function goToNextWord () {
    currentWordIndex++;
    attempts = 0;
    document.getElementById("guesses_remaining").innerHTML = getGuessesAllowed() - attempts;
    guesses = [];
    document.getElementById("game_board").innerHTML = words[currentWordIndex].split("").map(() => "_").join("");
}

function currentWordLetters() {
    return (this.words[this.currentWordIndex].split(""));
}

onStart();
console.log("hi");
console.log(currentWordLetters().length);


document.getElementById("word").innerHTML = words[currentWordIndex];
console.log(currentWordLetters()[2]);
document.addEventListener("keyup", onGuess);