const filestream = require('fs');

var streamCleaner = function () {
    const wordsCounter = {};
    var previousChunkPrefix = '';
    const WORDS_FILENAME = 'wordsFileName.txt';
    return {
        
        handleChunk: function (chunk) {
            // prepending the leftover from the last chunk
            if (previousChunkPrefix) {
                chunk = previousChunkPrefix + chunk
            }
            previousChunkPrefix = ''
            
            console.log("handling chunk of size  " + chunk.length)
            var words = JSON.stringify(chunk).toLowerCase().replace(/\W/g, "  ").replace(/[0-9]/g, ' ').split(" ");
            console.log('words : ' + words)
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
            if (!filestream.existsSync(WORDS_FILENAME)) {
                filestream.writeFileSync(WORDS_FILENAME, '{}');
            }
            filestream.readFile(WORDS_FILENAME, (err, data) => {
                if (err) throw err;
                if (data != null) {
                    var currentWords = JSON.parse(data);
                    addToCurrentWords(currentWords, wordsCounter);
                    filestream.writeFile(WORDS_FILENAME, JSON.stringify(currentWords), (err) => {
                        if (err) {
                            console.log('err = ' + err);
                            throw err;
                        }
                        console.log('file saved');
                    });
                }
            });
        }
    }

    // if the last word for chunk doesn't end with whitespace - we should prepend it to the next chunk
    function keepChunkOverflow(lastWord) {
        console.log('keepChunkOverflow' + lastWord)
        if (lastWord.trim().length != 0) { // this chunk ends mid-text. kee
            previousChunkPrefix = lastWord;
        }
    }

    function addToCurrentWords (currentWords, wordsCounter) {
        console.log('updating ' + Object.entries(wordsCounter).length + ' entries');
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