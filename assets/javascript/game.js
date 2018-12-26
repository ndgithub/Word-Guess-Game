var words = ["TEXAS", "CALIFORNIA", "IDAHO", "WYOMING"];
var currentWordIndex = 0;
var attempts = 0;
var guessed = [];
var wins = 0;
var losses = 0;

function onStart() {
    updateDisplay();
    document.addEventListener("keyup", onGuess);
    document.getElementById("title").focus();
}

function onGuess(event) {
    var keyPressed = event.key.toUpperCase();
    if (isLetterOnly(keyPressed)) {
        if (guessed.indexOf(keyPressed) === -1) {
            guessed.push(keyPressed);
            attempts++;
            updateDisplay();
            if (isRoundLost()) {
                losses++;
                goToNextWord();
                return;
            } else if (isRoundWon()) {
                wins++;
                goToNextWord();
                return;
            }
            
        }
    }
}
function getGameboardWord() {
    return (currentWordLetters().map(function (letter) {
        if (guessed.indexOf(letter) === -1) {
            return "&nbsp";
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
    return (getGameboardWord().indexOf("&nbsp") === -1);
}

function isLetterOnly(character) {
    if (character.length !== 1) {
        return false;
    }
    var checker = /^[A-Z]+$/i.test(character);
    return checker;
}



function updateDisplay() {
    document.getElementById("guessed").innerHTML = guessed.reduce(function (list, letter) {
        return (list + letter + " ");
    }, "");
    showGameBoard();
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("guesses_remaining").innerHTML = getGuessesAllowed() - attempts;
}

function showGameBoard() {
    var container = document.getElementById('game_board_container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    console.log(getGameboardWord());
    getGameboardWord().forEach(function (letter) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "game_board_letter");
        newDiv.innerHTML = letter;
        if (letter !== "&nbsp") {
            newDiv.setAttribute("class", "no_border");

        }
        container.appendChild(newDiv);
        
        
    });
}

function currentWordLetters() {
    return (words[currentWordIndex].split(""));
}

function getGuessesAllowed() {
    return (10);
}



onStart();
console.log(window.innerHeight / 2);