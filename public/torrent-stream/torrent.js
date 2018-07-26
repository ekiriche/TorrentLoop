const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8142;

var torrentStream = require('torrent-stream');
const magnetLink = require('magnet-link');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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
        //          stream.pipe(fs.createWriteStream('../movies/' + file.path));
                  var moviePath = 'http://localhost:8100/movies/' + file.path;
                  res.send(moviePath);
                }
            });
        });

  });
});

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});
