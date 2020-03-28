
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
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/testfile.txt',
        method: 'GET'
    }

    console.log('requesting ' )
    const url_req = http.request(options, response => {
        console.log(`statusCode for url request: ${response.statusCode}`)
        handleDataRequest(req, response);
    })
    console.log('requesting ' + url_req)

    url_req.on('error', error => {
        console.error(error)
    })

    url_req.end()
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