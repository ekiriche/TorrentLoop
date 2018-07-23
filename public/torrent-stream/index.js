const express = require('express');
const app = express();
const port = 8142;

var torrentStream = require('torrent-stream');
const magnetLink = require('magnet-link');

app.get('/', (request, response) => {
    magnetLink('https://yts.am/torrent/download/5BBBEEA6265E3C934AD7D657D5C5D5BC49DD6C87', (err, link) => {
        var engine = torrentStream(link, {
                path: '../'
            }
        );

        engine.on('ready', function() {
            console.log(this.files);
            engine.files.forEach(function(file) {
                console.log('filename:', file.name);
                var stream = file.createReadStream();
                // stream is readable stream to containing the file content
            });
        });
        response.send('Hello from Express!')
    });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});
