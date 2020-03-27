
var streamCleaner = require('../lib/streamCleaner');

function handleByMethod(req, res) {
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
        const data = JSON.parse(body);
        // Write back something interesting to the user:
        res.write(typeof data);
        res.end();
      } catch (er) {
        // uh oh! bad json!
        res.statusCode = 400;
        return res.end(`error: ${er.message}`);
      }
    });
}

module.exports = handleByMethod;