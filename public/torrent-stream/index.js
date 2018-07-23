const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8142;

var torrentStream = require('torrent-stream');
const magnetLink = require('magnet-link');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/get-stream', function(req, res) {

//    res.send(req.body);
    magnetLink(req.body.torrent, (err, link) => {
        var engine = torrentStream(link, {
                path: '../movies/'
            }
        );

        engine.on('ready', function() {
            engine.files.forEach(function(file) {
                console.log('filepath:', file.path);
                let format = file.name.split('.').pop();
                if (format === 'mp4' || format === 'webm' || format === 'ogg' || format === 'mkv')
                {
                  var stream = file.createReadStream();
                  res.send(file.path);
                }
            });
        });
    //    response.send('Hello from Express!')
  });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});
