const filestream = require('fs');

var streamCleaner = function () {
    const wordsCounter = {};
    const WORDS_FILENAME = 'wordsFileName.txt';
    return {
        
        handleChunk: function (chunk) {
            console.log("handling chunk of size  " + chunk.length);
            var words = chunk.replace(/[0-9{}"",/]/g, '').split(" ");
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
                    // console.log("current words : " + JSON.stringify(wordsCounter));
                    addToCurrentWords(currentWords, wordsCounter);
                    var writeToFile = JSON.stringify(currentWords);
                    // console.log("to write : " + writeToFile);
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

    function addToCurrentWords (currentWords, wordsCounter) {
        console.log('updating ' + Object.entries(wordsCounter).length + ' entries');
        for (let [key, value] of Object.entries(wordsCounter)) {
            // console.log("key " + key + " value " + value);
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