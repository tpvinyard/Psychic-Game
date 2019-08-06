const wordsToGuessFrom = ['sarlacc', 'ewok', 'amidala', 'sith', 'rathtar', 'skywalker', 'chewbacca', 'anikan', 'tatooine', 'jakku', 'lightsaber', 'obiwan', 'gungan', 'millennium', 'jedi', 'porg', 'sandcrawler','imperial'];
const facts = ['"In its belly, you will find a new definition of pain and suffering as you are slowly digested over a thousand years." ―C-3PO translating for Jabba the Hutt',
 'Ewoks were most notable for helping the Rebel Alliance defeat the forces of the Galactic Empire at the Battle of Endor. How did they defeat imperial forces with stone-age level technology? They just did. That\'s all that matters.',
 'Padme Amidala was a senator who represented the people of Naboo during the final years of the Galactic Republic. Her life and secret marriage to Anikan Skywalker undoubtedly shaped the galaxy for generations after her death.',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 '',
 ''
]

const gameCode = {
    resetCondition: false,
    wins: 0,
    livesLeft: 15,
    currentWord: [],
    secretWordPublic: [],
    lettersGuessedWrong: [],
    factOfCurrentWord: [],

    getRandomNumber: function(n) {
        return Math.floor(Math.random() * n);
    },

    getWordToGuess: function() {
 //       const n = this.getRandomNumber(wordsToGuessFrom.length);
        n = 1;
        this.currentWord.push(wordsToGuessFrom[n]);
        this.factOfCurrentWord.push(facts[n]);
        for (let i = 0; i < this.currentWord[0].length; i++) {
            this.secretWordPublic.push('-');
        }
    },

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

    result: function() {
        if (this.secretWordPublic.join('')==this.currentWord[0]){
            this.wins++;
            document.querySelector('#resultTitleText').textContent = 'The Force is strong with this one.';
            document.querySelector('#resultImage').innerHTML = "<img class='img-fluid' src='assets/images/" + this.currentWord[0] + ".gif'>";
            document.querySelector('#resultText').textContent = this.factOfCurrentWord[0];
            this.resetCondition = true;
        } else if (this.livesLeft===0) {
            document.querySelector('#resultTitleText').textContent = 'loser';
            this.resetCondition = true;
        }
    },

    resetGame: function() {
        this.livesLeft = 15;
        this.currentWord.length = 0;
        this.secretWordPublic.length = 0;
        this.lettersGuessedWrong.length = 0;
        this.getWordToGuess();
        this.updateDOM();
        this.resetCondition = false;
    },

    updateDOM: function ()  {
        const winsDOM = document.querySelector('#wins');
        const livesLeftDOM = document.querySelector('#guessesRemaining');
        const secretWordPublicDOM = document.querySelector('#secretWord');
        const lettersGuessedWrongDOM = document.querySelector('#alreadyGuessedLetters');

        winsDOM.textContent = this.wins;
        livesLeftDOM.textContent = this.livesLeft;
        secretWordPublicDOM.textContent = this.secretWordPublic.join('');
        lettersGuessedWrongDOM.textContent = this.lettersGuessedWrong.join('');
    }
}

gameCode.getWordToGuess();
gameCode.updateDOM();

document.onkeyup = function(e) {
    if (gameCode.resetCondition) {
        gameCode.resetGame();
    }
    const userSelection = e.key.toLowerCase();
    gameCode.guessLetter(userSelection);
    gameCode.result();
    gameCode.updateDOM();
}
