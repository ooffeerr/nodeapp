var fs = require('fs');
const WORDS_FILENAME = 'wordsFileName.txt';
var statistics = function () {
    return {
        count : function(word) {
            var words =  JSON.parse(fs.readFileSync(WORDS_FILENAME));
            return words[word];
        }
    }
}

module.exports = statistics;