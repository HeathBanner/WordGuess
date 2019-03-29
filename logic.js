
var testCounter = [];
var hidden = [];
var numGuesses = [10];
var guesses = [];
var numWins = 0;
var storageIndex = 0;
var correct = new Audio('chime.wav');
var wrong = new Audio('wrong.wav');
var levelUp = new Audio("levelup.mp3");
var end = new Audio("end.wav");

var storage = [
    { w: "wormhole", h: "A theoretical passage through space-time that could create shortcuts for long journeys across the universe." },
    { w: "singularity", h: "A location where the quantities that are used to measure the gravitational field become infinite in a way that does not depend on the coordinate system. In other words, it is a point in which all physical laws are indistinguishable from one another, where space and time are no longer interrelated realities, but merge indistinguishably and cease to have any independent meaning." },
    { w: "nebula", h: "A cloud of gas and dust in outer space, visible in the night sky either as an indistinct bright patch or as a dark silhouette against other luminous matter."},
]


word = storage[storageIndex].w.split("");
var hint = storage[storageIndex].h.split();
console.log(hint)

console.log(word)
console.log(hint)

var hintUpdate = document.getElementById("hintBody");
hintUpdate.textContent = hint;



for (var i = 0; i < storage[storageIndex].w.length; i++) {
    hidden.push("_");
}


testCounter = storage[storageIndex].w.length;
console.log(testCounter);

var currentWord = document.getElementById("hidden")
currentWord.innerHTML = hidden;


console.log(storage.length)


document.onkeyup = function (event) {
    userGuess = event.key;
    console.log(word);

    guesses[guesses.length] = userGuess;
    var guessedLetters = document.getElementById("guessedLetters");
    guessedLetters.textContent = guesses;
    
    


    if (word.indexOf(userGuess) >= 0) {
        console.log("yes");
        correct.currentTime = 0
        correct.play();

        guess = word.indexOf(userGuess);
        console.log(guess);

        dump = hidden.splice(guess, 1, userGuess);
        dump = word.splice(guess, 1, "-");
        
        var currentWord = document.getElementById("hidden");
        currentWord.textContent = hidden;
        testCounter--
        console.log(testCounter);

    } else if (word.indexOf(userGuess) < 0) {
        wrong.play();
        numGuesses--;
        var guessCount = document.getElementById("guessCount");
        guessCount.textContent = numGuesses;
    }
    if (numGuesses === 0) {
        var conf = confirm("You ran out of guesses! Press 'ok' to restart.")
        window.location.reload(false); 
        numGuesses[0] = 10;
    }


    if (testCounter === 0) {
        levelUp.play();  
        numGuesses = []
        numGuesses = 10;
        var guessCount = document.getElementById("guessCount");
        guessCount.textContent = numGuesses;
        console.log(numGuesses)

        numWins++
        var winCount = document.getElementById("numWins");
        winCount.textContent = numWins;

        for (var i = 0; i < word.length; i++) {
            hidden.pop();
        }

        storageIndex++
        
        if (storageIndex + 1 > storage.length) {
            end.play();
            var conf = confirm("You win! Press 'ok' to close the window")
            if (conf == true) {
                window.top.close();
            }
        }

        word = storage[storageIndex].w.split("");

        for (var i = 0; i < word.length; i++) {
            hidden.push("_");
        }
        
        testCounter = storage[storageIndex].w.length;

        guesses = [];

        var guessedLetters = document.getElementById("guessedLetters");
        guessedLetters.textContent = guesses;

        var currentWord = document.getElementById("hidden");
        currentWord.textContent = hidden;

        
        hint = [];
        hint = storage[storageIndex].h.split();
        console.log(hint)


        hintUpdate.textContent = hint;
    }

    
}
