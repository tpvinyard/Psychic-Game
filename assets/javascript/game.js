const wordsToGuessFrom = ['sarlacc', 'ewok', 'amidala', 'sith', 'rathtar', 'skywalker', 'chewbacca', 'anikan', 'tatooine', 'jakku', 'lightsaber', 'obiwan', 'gungan', 'millennium', 'jedi', 'porg', 'sandcrawler','imperial'];

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
        } else if (this.lettersGuessedWrong.includes(char)) {
            console.log('you already guessed that letter');
        } else {
            this.lettersGuessedWrong.push(char);
            this.livesLeft--;
        }
    },

    result: function() {
        if (this.secretWordPublic.join('')==this.currentWord[0]){
            wins++;
            document.querySelector('#resultText').textContent = 'winner';
        } else if (this.livesLeft===0) {
            document.querySelector('#resultText').textContent = 'loser';
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
gameCode.updateDOM();

document.onkeyup = function(e) {
    const userSelection = e.key.toLowerCase();
    gameCode.guessLetter(userSelection);
    gameCode.result();
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