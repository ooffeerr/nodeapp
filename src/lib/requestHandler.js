
function handleByMethod(req, res) { 
    console.log('handling request of type ' + req.query.method);
    switch(req.query.method) {
        case 'file':
            handleFileRequest(req, res);
            res.write('ok');
            res.end();    
            break;
        case 'url':
            console.log('url');
            handleUrlRequest(req, res);
            res.write('ok');
            res.end();
            break;
        case 'data':
        default:
            handleDataRequest(req, res);
    }
}


function handleUrlRequest(req, res) {
    console.log('handleUrlRequest')
    const http = require('http')
    req.setEncoding('utf8');
    req.on('data', (data) => {
        console.log('fetching ' + data)
        const url_req = http.get(data, {encoding: 'utf8'}, response => {
            console.log(`statusCode for url request: ${response.statusCode}`)
            var streamCleaner = require('../lib/streamCleaner')();
            response.on('data', streamCleaner.handleChunk);
        })
    
    })
}

function handleDataRequest(req, res) {
    console.log('handleDataRequest')    
    var streamCleaner = require('../lib/streamCleaner')();
    req.setEncoding('utf8');
    req.on('data', streamCleaner.handleChunk);
  
    // The 'end' event indicates that the entire body has been received.
    req.on('end', () => {
        streamCleaner.persistWords();
      try {
        // Write back something interesting to the user:
        res.write('ok');
        res.end();
      } catch (er) {
        // uh oh! bad json!
        res.statusCode = 400;
        return res.end(`error: ${er.message} + ${er.stack}`);
      }
    });
}

module.exports = handleByMethod;