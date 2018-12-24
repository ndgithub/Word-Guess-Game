var words = ["honda", "two", "three"];
var currentWordIndex = 0;
var attempts = 0;
var guessed = [];
var wins = 0;
var losses = 0;

function onStart() {
    updateDisplay();
    document.addEventListener("keyup", onGuess);
}

function onGuess(event) {
    var keyPressed = event.key.toLowerCase();
    if (isLetterOnly(keyPressed)) {
        if (guessed.indexOf(keyPressed) === -1) {
            guessed.push(keyPressed);
            attempts++;
            if (isRoundLost()) {
                losses++;
                goToNextWord();
                return;
            } else if (isRoundWon()) {
                wins++;
                goToNextWord();
                return;
            }
            updateDisplay();
        }
    }
}
function getGameboardWord() {
    return (currentWordLetters().map(function (letter) {
        if (guessed.indexOf(letter) === -1) {
            return "_";
        } else {
            return letter;
        }
    }
    ));
}

function goToNextWord() {
    currentWordIndex++;
    attempts = 0;
    guessed = [];
    updateDisplay();
}

function isRoundLost() {
    return (getGuessesAllowed() - attempts === 0);
}

function isRoundWon() {
    return (getGameboardWord().indexOf("_") === -1);
}

function isLetterOnly(character) {
    if (character.length !== 1) {
        return false;
    }
    var checker = /^[a-z]+$/i.test(character);
    return checker;
}



function updateDisplay() {
    document.getElementById("guessed").innerHTML = guessed.reduce(function (list, letter) {
        return (list + letter.toUpperCase() + " ");
    }, "");
    document.getElementById("game_board").innerHTML = getGameboardWord().join("&nbsp");
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("guesses_remaining").innerHTML = getGuessesAllowed() - attempts;
}

function currentWordLetters() {
    return (words[currentWordIndex].split(""));
}

function getGuessesAllowed() {
    return (words[currentWordIndex].length * 3);
}



onStart();
