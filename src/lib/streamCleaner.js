const filestream = require('fs');
/**
 * curates the text and counts the unique words.
 * @param {an input stream of an text block} stream 
 */
const wordsCounter = {};

function streamReader(chunk) {
    var words = chunk.replace(/[0-9{}"",/]/g, '').split(" ");
    words.map((word) => {
        console.log("mapped word : " + word);
        if (wordsCounter[word] == null) {
            wordsCounter[word] = 1
        }
        else {
            wordsCounter[word] = wordsCounter[word] + 1;
        }
    });
    console.log("sorted words counters  " + Object.values(wordsCounter).sort());
    updateReadWords(wordsCounter);
}

const WORDS_FILENAME = 'wordsFileName.txt';

function updateReadWords(wordsCounter) {
    if (!filestream.existsSync(WORDS_FILENAME)) {
        filestream.writeFileSync(WORDS_FILENAME, '{}');
    }
    filestream.readFile(WORDS_FILENAME, (err, data) => {
        if (err) throw err;
        if (data != null) {
            var currentWords = JSON.parse(data);
            console.log("current words : " + JSON.stringify(wordsCounter));
            addToCurrentWords(currentWords, wordsCounter);
            var writeToFile = JSON.stringify(currentWords);
            console.log("to write : " + writeToFile);
            filestream.writeFile(WORDS_FILENAME, JSON.stringify(currentWords), (err) => {
                if (err)  {
                    console.log('err = ' + err); 
                    throw err;
                }
                console.log('file saved');
            });
        }
    });
}
function ensureFileExists(filename) {
    filestream.writeFile(filename, '{}', { flag: 'wx' }, function (err) {
        if (err) throw err;
        console.log("creating persistency for the first time");
    });
}

function addToCurrentWords(currentWords, wordsCounter) {
    for (let [key, value] of Object.entries(wordsCounter)) {
        console.log("key " + key + " value " + value);
        if (currentWords[key]) {
            currentWords[key]+= value;
        }
        else {
            currentWords[key] = value;
        }    
    }
    
        
    
}

module.exports = streamReader;