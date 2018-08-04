const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
const axios = require('axios');
const srt2vtt = require('srt-to-vtt');
const app = express();

var torrentStream = require('torrent-stream');
const magnetLink = require('magnet-link');

let moviePath = '';
let torrentFile = '';
let beginDownload = false;

var moviesArr = [];

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'))
});

app.post('/get-stream', function(req, res) {
    console.log(123);
    if (!fs.existsSync('public/downloaded_movies'))
        fs.mkdir('public/downloaded_movies');
    if (!fs.existsSync('public/not_downloaded_movies'))
        fs.mkdir('public/not_downloaded_movies');
    if (!fs.existsSync('public/subtitles'))
        fs.mkdir('public/subtitles');

    torrentFile = req.body.torrent;
    res.send('OK');
});

app.get('/video/:id', function(req, res) {

    if (req.params.id in moviesArr) {
        moviePath = moviesArr[req.params.id];
    } else {
        var requestId = req.params.id;
        console.log("not exists");
        magnetLink(torrentFile, (err, link) => {
            var engine = torrentStream(link, {
                    path: 'public/downloaded_movies'
                }
            );
            engine.on('ready', () => {
                engine.files.forEach((file) => {
                    console.log('filepath:', file.path);
                    let format = file.name.split('.').pop();
                    if (format === 'mp4' || format === 'webm' || format === 'ogg' || format === 'mkv') {
                        let stream = file.createReadStream();
                        moviePath = 'public/downloaded_movies/' + file.path;
                        moviesArr[requestId] = moviePath;
                    }
                })
            })
        });
    }


    console.log(req.params.id);

    console.log('moviePath', moviePath);
    let path = moviePath;
    let stat = fs.statSync(path);
    let fileSize = 367001600;//stat.size
    // let fileSize = stat.size;//stat.size
    let range = req.headers.range;

    if (range) {
        let parts = range.replace(/bytes=/, "").split("-");
        let start = parseInt(parts[0], 10);
        let end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        let chunksize = (end-start)+1;

        console.log('chunksize ', chunksize);
        let file = fs.createReadStream(path, {start, end});
        let head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        let head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }

});

app.listen(3000, function () {
    console.log('Listening on port 3000!')
});
