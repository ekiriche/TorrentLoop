const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
const axios = require('axios');
const srt2vtt = require('srt-to-vtt');
const app = express();
const port = 8142;

var torrentStream = require('torrent-stream');
const magnetLink = require('magnet-link');

let moviePath = '';
let subPath = '';
let dansGame = 0;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

schedule.scheduleJob('*/5 * * * *', function() {
  axios.get('http://localhost:8100/movie/delete-not-watched-films').then (result => {
    console.log(result.data);
  })
});

app.post('/get-stream', function(req, res) {

    if (!fs.existsSync('public/downloaded_movies'))
      fs.mkdir('public/downloaded_movies');
    if (!fs.existsSync('public/not_downloaded_movies'))
      fs.mkdir('public/not_downloaded_movies');
    if (!fs.existsSync('public/subtitles'))
      fs.mkdir('public/subtitles');
//    res.send(req.body);
    magnetLink(req.body.torrent, (err, link) => {
        var engine = torrentStream(link, {
                path: 'public/downloaded_movies'
            }
        );

        engine.on('ready', () => {
            engine.files.forEach((file) => {
                console.log('filepath:', file.path);
                let format = file.name.split('.').pop();
                if (format == 'mp4' || format == 'webm' || format == 'ogg' || format == 'mkv')
                {
                  let stream = file.createReadStream();
                  stream.pipe(fs.createWriteStream('public/not_downloaded_movies/' + file.name));
                  moviePath = 'downloaded_movies/' + file.path;
  //                res.send(moviePath);
                }
                if (format == 'srt')
                {
                  let sub_stream = file.createReadStream();
                  sub_stream.pipe(srt2vtt())
                            .pipe(fs.createWriteStream('public/subtitles/' + req.body.imdb + '.vtt'));
                  subPath = 'subtitles/' + req.body.imdb + '.vtt';
                  console.log(subPath);
                }
            });
        });

        engine.on('download', () => {
          dansGame++;
        })
        res.send('OK');
  });
});

app.get('/', function(req, res) {
  setTimeout(() => {
    res.render('index', {moviePath : moviePath, subPath : subPath});
  }, 2000);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});
