

var icons = ['<i class="fab fa-centos"></i>', '<i class="fab fa-accusoft"></i>', '<i class="fas fa-adjust"></i>', '<i class="fab fa-acquisitions-incorporated"></i>','<i class="fas fa-moon"></i>','<i class="fas fa-project-diagram"></i>', '<i class="fas fa-tenge"></i>', '<i class="fas fa-dna"></i>']
var testCounter = [];
var hidden = [];
var numGuesses = [10];
var guesses = [];
var level = 1;
var storageIndex = 0;
var correct = new Audio('audio/chime.wav');
var wrong = new Audio('audio/wrong.wav');
var levelUp = new Audio("audio/levelup.mp3");
var end = new Audio("audio/end.wav");
var alertDelay = 1;

var storage = [
    { w: "antimatter", h: "is defined as a material composed of the antiparticles of the corresponding particles of ordinary matter"},
    { w: "wormhole", h: "A theoretical passage through space-time that could create shortcuts for long journeys across the universe" },
    { w: "corona", h: "The outer part of the Sun's atmosphere"},
    { w: "nebula", h: "A cloud of gas and dust in outer space, visible in the night sky either as an indistinct bright patch or as a dark silhouette against other luminous matter"},
    { w: "singularity", h: "A location where the quantities that are used to measure the gravitational field become infinite in a way that does not depend on the coordinate system. In other words, it is a point in which all physical laws are indistinguishable from one another, where space and time are no longer interrelated realities, but merge indistinguishably and cease to have any independent meaning" },
]

// Creates a random icon and appends it
for (var i = 0; i < storage[storageIndex].w.length; i++) {
    var randIcon = icons[Math.floor(Math.random() * icons.length)];
    var newDiv = $(randIcon);
    newDiv.attr("id", i);
    $("#test").append(newDiv);
};

// Logs the word and hint in to a variable 
var word = storage[storageIndex].w.split("");
var hint = storage[storageIndex].h.split();

// Places the hint in to the HTML
var hintUpdate = document.getElementById("hintBody");
hintUpdate.textContent = hint;

// Logs the test counter
testCounter = storage[storageIndex].w.length;

const modal = document.getElementById('close');

const closeModal = (e) => {
    document.getElementById('modal').remove();
}

modal.onclick = closeModal

// Listens for keys pressed
document.onkeyup = function (event) {
    userGuess = event.key.toLowerCase();

    // Logs the user's guessed key
    var guessedLetters = document.getElementById("guessedLetters");
    guessedLetters.append(userGuess.toUpperCase());
    
    // Checks to see if the user's guess is correct
    if (word.indexOf(userGuess) >= 0) {
       
        // Resets the audio file and plays it
        correct.currentTime = 0
        correct.play();

        // Logs the user's guessed letter
        guess = word.indexOf(userGuess);
        
        // Replaces the appropriate Icon with the correct letter
        var iconUpdate = document.getElementById(guess);
        var iconReplacement = document.createElement("span");
        iconReplacement.setAttribute("id", guess);
        iconUpdate.replaceWith(iconReplacement);
        var iconUpdate = document.getElementById(guess);
        iconUpdate.textContent = userGuess.toUpperCase();

        // Replaces the appropriate letter
        dump = word.splice(guess, 1, "-");

        // Lowers the test counter
        testCounter--

        // Plays audio file and lowers the Number of Guesses
    } else if (word.indexOf(userGuess) < 0) {
        wrong.play();
        numGuesses--;
        var guessCount = document.getElementById("guessCount");
        guessCount.textContent = numGuesses;
    } // Notifies the user they've lost then refreshes the page
    if (numGuesses === 0) {
        var conf = confirm("You've run out of guesses! Press 'ok' to restart.")
        window.location.reload(false); 
    }
    // Triggers the next level once the user has guessed all letters
    if (testCounter === 0) {
        levelUp.play();  
        
        // Resets the number of guesses and updates the HTML
        numGuesses = []
        numGuesses = 10;
        var guessCount = document.getElementById("guessCount");
        guessCount.textContent = numGuesses;        
        
        storageIndex++
        
        // Notifies the user that they've won and closes tab if pressed ok
        if (storageIndex + 1 > storage.length) {
            end.play();
            setTimeout( function(){
                var conf = confirm("You win! Press 'ok' to close the window")
                if (conf == true) {
                    window.top.close();
                }
            }, alertDelay);
        }

        setTimeout( function(){

            // Upgrades the level
            level++
            var levelCount = document.getElementById("level");
            levelCount.textContent = level;
    
            // Removes all correctly guesses words
            for (var i = 0; i < word.length; i++) {
                var wordReset = document.getElementById(i);
                wordReset.parentNode.removeChild(wordReset);
            }

            // Resets the word variable
            word = storage[storageIndex].w.split("");

            // Resets the icons
            for (var i = 0; i < storage[storageIndex].w.length; i++) {
                var randIcon = icons[Math.floor(Math.random() * icons.length)];
                var newDiv = $(randIcon);
                newDiv.attr("id", i);
                $("#test").append(newDiv);
            }
            
            // Resets the test counter
            testCounter = storage[storageIndex].w.length;

            // Resets the guesses and Updates the HTML
            guesses = [];
            var guessedLetters = document.getElementById("guessedLetters");
            guessedLetters.textContent = guesses;

            // Resets the hint and updates the HTML
            hint = [];
            hint = storage[storageIndex].h.split();
            hintUpdate.textContent = hint;
        }, alertDelay);
    }
}