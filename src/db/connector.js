
function init() {
  
  var db;

  return {
    ensureDbInit : function() {
      console.log('ensureDbInit')
      var sqlite3 = require('sqlite3').verbose();
      const path = require('path')
      const dbPath = path.resolve(__dirname, 'words.db')
      db = new sqlite3.Database(dbPath)
      db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY, word TEXT)");
        // db.run("INSERT INTO words values ('2', '{}')")
      })
    }, 

    getWords: function (callback) {
      db.all(`SELECT word FROM words LIMIT 1`, [], (err, rows ) => {
        if (callback) {
          callback(rows[0].word)
        } 
      });
    },

    saveWords: function(dictionary) {
      console.log('saving ' + dictionary)
      db.run(`UPDATE words SET word = '${JSON.stringify(dictionary)}' WHERE id = 2`);
    }
  }
}

module.exports = init