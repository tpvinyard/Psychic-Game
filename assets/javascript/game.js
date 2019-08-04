const wordsToGuessFrom = ['sarlacc', 'wookie'];

const gameCode = {
    wins: 0,
    livesLeft: 15,
    currentWord: '',
    secretWordPublic: '',
    lettersGuessedWrong: [],
    facts: [],

    getRandomNumber: function(n) {
        return Math.floor(Math.random() * n);
    },

    getWordToGuess: function() {
        this.currentWord = wordsToGuessFrom[this.getRandomNumber(wordsToGuessFrom.length)];
        for (let i = 0; i < this.currentWord.length; i++) {
            this.secretWordPublic += '-';
        }
    },

    guessLetter: function(char) {
        if (this.currentWord.includes(char.toLowerCase())) {
            return true;
        } else {
            this.lettersGuessedWrong.push(char);
        }
    }

}

    gameCode.getWordToGuess();
    console.log(gameCode.currentWord);
    console.log(gameCode.guessLetter('s'));
    console.log(gameCode.lettersGuessedWrong);
    console.log(gameCode.secretWordPublic);