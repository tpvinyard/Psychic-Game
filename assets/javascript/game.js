const wordsToGuessFrom = ['sarlacc', 'wookie'];

const gameCode = {
    wins: 0,
    livesLeft: 15,
    currentWord: [],
    secretWordPublic: [],
    lettersGuessedWrong: [],
    facts: [],

    getRandomNumber: function(n) {
        return Math.floor(Math.random() * n);
    },

    getWordToGuess: function() {
        this.currentWord.push(wordsToGuessFrom[this.getRandomNumber(wordsToGuessFrom.length)]);
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
        } else {
            this.lettersGuessedWrong.push(char);
            this.livesLeft--;
        }
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

document.onkeyup = function(e) {
    const userSelection = e.key.toLowerCase();
    gameCode.guessLetter(userSelection);
    gameCode.updateDOM();
}

// Debugging to the console
// gameCode.getWordToGuess();
// console.log(gameCode.currentWord);
// console.log(gameCode.guessLetter('c'));
// console.log(gameCode.lettersGuessedWrong);
// console.log(gameCode.secretWordPublic.join(''));
// console.log(gameCode.livesLeft);
// gameCode.updateDOM();