// Game object

var words = ["one", "two", "three"];
var currentWordIndex = 0;
var attempts = 0;
var guessed = [];

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
    // get the key pressed
    var keyPressed = event.key;
    if (isLetterOnly(keyPressed)) {

        // If the letteronlykeyPressd is not on the guessed list.
        if (guessed.indexOf(keyPressed) === -1) {
            //  add the keyPressed to the guessed lit
            guessed.push(keyPressed);
            // create a string
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
            document.getElementById("game_board").innerHTML = gameboardWord.join("");
            document.getElementById("guessed").innerHTML = guessed.reduce(function (list, letter) {
                return (list + letter.toUpperCase() + " ");
            }, "");

            if (getGuessesAllowed() - attempts === 0 || gameboardWord.indexOf("_") === -1) {
                goToNextWord();
            }


            console.log("keyPressed is: " + keyPressed)
            console.log("guesses: " + guessed);
            console.log(gameboardWord.join(""));
        }
    }
}

function isLetterOnly(character) {
    if (character.length !== 1) {
        return false;
    }
    var checker = /^[a-z]+$/i.test(character);
    console.log("checker is: " + checker);
    return checker;

}

function goToNextWord() {
    currentWordIndex++;
    attempts = 0;
    document.getElementById("guesses_remaining").innerHTML = getGuessesAllowed() - attempts;
    guessed = [];
    document.getElementById("guessed").innerHTML = guessed.reduce(function (list, letter) {
        return (list + letter.toUpperCase() + " ");
    }, "");
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