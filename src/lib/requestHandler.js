
function handleByMethod(req, res) {
    console.log('handling request of type ' + req.query.method);
    switch (req.query.method) {
        case 'file':
            handleFileRequest(req, res);
            res.write('ok');
            res.end();
            break;
        case 'url':
            handleUrlRequest(req, res);
            res.write('ok');
            res.end();
            break;
        case 'data':
        default:
            handleDataRequest(req, res);
    }
}

function handleFileRequest(req, res) {
    console.log('file request')
    req.on('data', (filename) => {
        const fs = require('fs')
        const streamCleaner = require('../lib/streamCleaner')();
        const stream = fs.createReadStream(filename, {encoding: 'utf8'})
        stream.on('data', streamCleaner.handleChunk)
        stream.on('end', streamCleaner.persistWords)
    })
}

function handleDataRequest(req, res) {
    const streamCleaner = require('../lib/streamCleaner')();
    req.setEncoding('utf8');
    req.on('data', streamCleaner.handleChunk);

    req.on('end', () => {
        streamCleaner.persistWords();
        res.write('ok');
        res.end();
    });
}

function handleUrlRequest(req, res) {
    console.log('handleUrlRequest')
    var streamCleaner = require('../lib/streamCleaner')();

    const http = require('http')
    req.setEncoding('utf8');
    req.on('data', (url) => {
        console.log('fetching ' + url)
        const url_req = http.get(url, { encoding: 'utf8' }, response => {
            console.log(`statusCode for url request: ${response.statusCode}`)        
            response.on('data', streamCleaner.handleChunk);
            response.on('end', streamCleaner.persistWords);
        })

    })
}

module.exports = handleByMethod;