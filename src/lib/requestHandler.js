
var streamCleaner = require('../lib/streamCleaner');

function handleByMethod(req, res) { 
    console.log('handling request of type ' + req.query.method);
    switch(req.query.method) {
        case 'file':
            handleFileRequest(req, res);
            break;
        case 'url':
            console.log('url');
            handleUrlRequest(req, res);
            break;
        case 'data':
        default:
            handleDataRequest(req, res);
    }
}

function handleDataRequest(req, res) {
    let body = '';
    // Get the data as utf8 strings.
    // If an encoding is not set, Buffer objects will be received.
    req.setEncoding('utf8');
    
  
    // Readable streams emit 'data' events once a listener is added.
    // req.on('data', (chunk) => {
    //   console.log('on chunk' + chunk);
    //   body += chunk;
    // });
  
    req.on('data', streamCleaner);
  
    // The 'end' event indicates that the entire body has been received.
    req.on('end', () => {
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