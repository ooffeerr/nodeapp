function StreamParser() {
    var counterWords = {};
    return {
        init: function(name) {
            savedName = name;
        },
        getName: function() {
            return savedName;
        }
    };
}

module.exports = CommonModule;