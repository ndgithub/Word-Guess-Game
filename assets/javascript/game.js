var words = ["one", "two", "three"];
var currentWordIndex = 0;
var attempts = 0;
var guessed = [];
var wins = 0;
var losses = 0;

function onStart() {
    updateDisplay();
    document.addEventListener("keyup", onGuess);
}

function getGuessesAllowed() {
    return (words[currentWordIndex].length * 3);
}

function onGuess(event) {
    var keyPressed = event.key.toLowerCase();
    if (isLetterOnly(keyPressed)) {
        if (guessed.indexOf(keyPressed) === -1) {
            guessed.push(keyPressed);
            var gameboardWord = currentWordLetters().map(function (letter) {
                if (guessed.indexOf(letter) === -1) {
                    return "_";
                } else {
                    return letter;
                }
            }
            );
            attempts++;
            document.getElementById("guesses_remaining").innerHTML = getGuessesAllowed() - attempts;
            document.getElementById("game_board").innerHTML = gameboardWord.join(" ");
            document.getElementById("guessed").innerHTML = guessed.reduce(function (list, letter) {
                return (list + letter.toUpperCase() + " ");
            }, "");

            if (getGuessesAllowed() - attempts === 0) {
                losses++;
                goToNextWord();
            } else if (gameboardWord.indexOf("_") === -1) {
                wins++;
                goToNextWord();
            }
        }
    }
}

function isLetterOnly(character) {
    if (character.length !== 1) {
        return false;
    }
    var checker = /^[a-z]+$/i.test(character);
    return checker;
}

function goToNextWord() {
    currentWordIndex++;
    attempts = 0;
    guessed = [];
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("guessed").innerHTML = guessed.reduce(function (list, letter) {
        return (list + letter.toUpperCase() + " ");
    }, "");
    document.getElementById("game_board").innerHTML = words[currentWordIndex].split("").map(() => "_ ").join("");
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("guesses_remaining").innerHTML = getGuessesAllowed() - attempts;
}

function currentWordLetters() {
    return (this.words[this.currentWordIndex].split(""));
}

onStart();
