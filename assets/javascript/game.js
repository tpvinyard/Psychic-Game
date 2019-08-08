const wordsToGuessFrom = ['sarlacc', 'ewok', 'sith', 'rathtar', 'skywalker', 'chewbacca', 'anikan', 'tatooine', 'jakku', 'lightsaber', 'obiwan', 'gungan', 'millennium', 'jedi', 'porg'];
const facts = ['"In its belly, you will find a new definition of pain and suffering as you are slowly digested over a thousand years." ―-C-3PO translating for Jabba the Hutt',
 'Ewoks were most notable for helping the Rebel Alliance defeat the forces of the Galactic Empire at the Battle of Endor. How did they defeat imperial forces with stone-age level technology? They just did. That\'s all that matters.',
 'The Sith, also referred to as the Sith Order, was an ancient order of Force-wielders devoted to the dark side of the Force.',
 '"What\'s a rathtar?" "You want the scientific description? They\'re big and dangerous and ugly." --Rey and Han Solo',
 '"Never. I\'ll never turn to the dark side. You\'ve failed, your highness. I am a Jedi, like my father before me." -―Luke Skywalker, to Darth Sidious',
 'Chewbacca, known affectionately to his friends as Chewie, was a Wookiee warrior, smuggler, and resistance fighter who fought in the Clone Wars, the Galactic Civil War, and the conflict between the First Order and the Resistance. AKA a total boss.',
 'Jedi Knight of the Galactic Republic and the Chosen One of the Force. Turned to the dark side of the Force and became known as Darth Vader.',
 '"Well, if there\'s a bright center to the universe, you\'re on the planet that it\'s farthest from." -―Luke Skywalker, to C-3PO',
 '"Where are you from?" "Nowhere." "No one\'s from nowhere." "Jakku." "Okay, that\'s pretty much nowhere." -―Luke Skywalker and Rey',
 '"This is the weapon of a Jedi Knight. Not as clumsy or random as a blaster. An elegant weapon for a more civilized age." -―Obi-Wan Kenobi',
 'A legendary Jedi Master and member of the Jedi High Council. A great leap forward often requires taking two steps back." -―Obi-Wan Kenobi',
 'Very silly creatures. Shouldn\'t have ever existed. Period.',
 '"It\'s the ship that made the Kessel Run in less than twelve parsecs. I\'ve outrun Imperial starships. Not the local bulk cruisers, mind you, I\'m talking about the big Corellian ships now. She\'s fast enough for you, old man." -―Han Solo and Obi-Wan Kenobi',
 'A Jedi was a member of the Jedi Order, an ancient order of protectors united by their ability to harness the power of the Force.',
 '"They\'re from Ahch-To. Luke called them porgs. They\'re adorable." -―Rey, to Poe Dameron'
];

// object that contains all placeholder arrays, variables, and game functions
const gameCode = {
    resetCondition: false,
    wins: 0,
    livesLeft: 7,
    currentWord: [],
    secretWordPublic: [],
    lettersGuessedWrong: [],
    factOfCurrentWord: [],

    // Gets a random number to use that is between 0 - n
    getRandomNumber: function(n) {
        return Math.floor(Math.random() * n);
    },

    // gets a word to guess out of the wordsToGuessFrom array and then assigns that out
    getWordToGuess: function() {
        const n = this.getRandomNumber(wordsToGuessFrom.length);
        this.currentWord.push(wordsToGuessFrom[n]);
        this.factOfCurrentWord.push(facts[n]);
        for (let i = 0; i < this.currentWord[0].length; i++) {
            this.secretWordPublic.push('-');
        }
    },

    //mechanics to play the game and compare if letter guessed is in the secret word
    guessLetter: function(char) {
        if (this.currentWord[0].includes(char.toLowerCase())) {
            for (let i = 0; i < this.currentWord[0].length; i++) {
                if (this.currentWord[0][i]==char) {
                    this.secretWordPublic[i] = char;
                }
            }
        } else if (this.lettersGuessedWrong.includes(char)) {
            console.log('Already guessed that letter, you have.');
        } else {
            this.lettersGuessedWrong.push(char);
            this.livesLeft--;
        }
    },

    // win or loss outcomes
    result: function() {
        if (this.secretWordPublic.join('')==this.currentWord[0]){
            this.wins++;
            document.querySelector('#resultTitleText').textContent = 'The Force is strong with this one.';
            document.querySelector('#resultImage').innerHTML = "<img class='img-fluid' src='assets/images/" + this.currentWord[0] + ".gif'>";
            document.querySelector('#resultText').textContent = this.factOfCurrentWord[0];
            document.querySelector('#resultSound').textContent = "Now Playing: 'The Throne Room' by John Williams";
            document.querySelector('#throneSound').play();
            this.resetCondition = true;
        } else if (this.livesLeft===0) {
            document.querySelector('#resultTitleText').textContent = 'The Emperor will show you the true nature of the Force. He is your Master now.';
            document.querySelector('#resultImage').innerHTML = "<img class='img-fluid' src='assets/images/palpatine.gif'>";
            document.querySelector('#resultSound').textContent = "Now Playing: 'The Imperial March' by John Williams";
            document.querySelector('#imperialSound').play();
            this.resetCondition = true;
        }
    },

    // reset the DOM and all arrays so that the game can be played again
    resetGame: function() {
        this.livesLeft = 7;
        this.currentWord.length = 0;
        this.secretWordPublic.length = 0;
        this.lettersGuessedWrong.length = 0;
        this.factOfCurrentWord.length = 0;
        document.querySelector('#resultTitleText').textContent = '';
        document.querySelector('#resultImage').innerHTML = '';
        document.querySelector('#resultText').textContent = '';
        document.querySelector('#resultSound').innerHTML = '';
        document.querySelector('#imperialSound').pause();
        document.querySelector('#imperialSound').currentTime = 0;
        document.querySelector('#throneSound').pause();
        document.querySelector('#throneSound').currentTime = 0;
        this.getWordToGuess();
        this.updateDOM();
        this.resetCondition = false;
    },

    //update the DOM to show your progress in the game and wins
    updateDOM: function ()  {
        const winsDOM = document.querySelector('#wins');
        const livesLeftDOM = document.querySelector('#guessesRemaining');
        const secretWordPublicDOM = document.querySelector('#secretWord');
        const lettersGuessedWrongDOM = document.querySelector('#alreadyGuessedLetters');

        document.querySelector('#secretWord').focus();

        winsDOM.textContent = this.wins;
        livesLeftDOM.textContent = this.livesLeft;
        secretWordPublicDOM.textContent = this.secretWordPublic.join('');
        lettersGuessedWrongDOM.textContent = this.lettersGuessedWrong.join('');
    }
}

// on page load, the DOM is updated and an initial word is guessed
gameCode.getWordToGuess();
gameCode.updateDOM();

// performs the necessary actions whenever a key is clicked
document.onkeyup = function(e) {
    if (gameCode.resetCondition) {
        gameCode.resetGame();
    }
    if (e.which <= 90 && e.which >= 65) {
        const userSelection = e.key.toLowerCase();
        gameCode.guessLetter(userSelection);
        gameCode.result();
        gameCode.updateDOM();
    }
}
