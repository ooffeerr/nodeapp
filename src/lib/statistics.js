var statistics = function () {
    var db = require('../db/connector')()
    db.ensureDbInit()

    return {
        countAndRespond: function (word, res) {
            const count = db.getWords((result) => {
                var count = JSON.parse(result)[word];
                console.log(count)
                if (count) {
                    res.write(JSON.stringify(count));
                    res.end();
                }
                else {
                    res.write('0');
                    res.end();
                }
            })
        }
    }
}

module.exports = statistics;