const filestream = require('fs');

var streamCleaner = function () {
    const wordsCounter = {};
    var previousChunkPrefix = '';

    return {    
        handleChunk: function (chunk) {
            console.log('processing chunk of size ' + chunk.length)
            // prepending the leftover from the last chunk
            if (previousChunkPrefix) {
                chunk = previousChunkPrefix + chunk
            }
            previousChunkPrefix = ''            
            var words = JSON.stringify(chunk).toLowerCase().replace(/\W/g, " ").replace(/[0-9]/g, ' ').split(" ");
            keepChunkOverflow(words.pop())
            words.map((word) => {
                if (wordsCounter[word]) {
                    wordsCounter[word] = wordsCounter[word] + 1;
                }
                else {
                    wordsCounter[word] = 1;
                }
            });
        },

        persistWords: function () {
            console.log('persisting');
            var db = require('../db/connector.js')()
            db.ensureDbInit();
            db.getWords((data) => {
                if (data != null) {
                    var currentWords = JSON.parse(data);
                    addToCurrentWords(currentWords, wordsCounter);
                    delete currentWords[""]
                    db.saveWords(currentWords)
                }
            });
        }
    }

    // if the last word for chunk doesn't end with whitespace - we should prepend it to the next chunk
    function keepChunkOverflow(lastWord) {
        if (lastWord.trim().length != 0) { // this chunk ends mid-text. kee
            previousChunkPrefix = lastWord;
        }
    }

    function addToCurrentWords (currentWords, wordsCounter) {
        for (let [key, value] of Object.entries(wordsCounter)) {
            if (currentWords[key]) {
                currentWords[key] += value;
            }
            else {
                currentWords[key] = value;
            }
        }
    }
}

module.exports = streamCleaner;