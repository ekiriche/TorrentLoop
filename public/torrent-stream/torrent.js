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

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'))
})

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

app.get('/video', function(req, res) {

  if (beginDownload == false)
  {
    magnetLink(torrentFile, (err, link) => {
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
          //            stream.pipe(fs.createWriteStream('public/not_downloaded_movies/' + file.name));
          moviePath = 'public/downloaded_movies/' + file.path;
          //              res.send(moviePath);
        }
      })
    })
  })
  beginDownload = true;
}
console.log(moviePath);
const path = moviePath;
const stat = fs.statSync(path)
const fileSize = stat.size
const range = req.headers.range
console.log(range);

if (range) {
  const parts = range.replace(/bytes=/, "").split("-")
  const start = parseInt(parts[0], 10)
  const end = parts[1]
  ? parseInt(parts[1], 10)
  : fileSize-1

  const chunksize = (end-start)+1
  const file = fs.createReadStream(path, {start, end})
  const head = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunksize,
    'Content-Type': 'video/mp4',
  }

  res.writeHead(206, head)
  file.pipe(res)
} else {
  const head = {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  }
  res
  .writeHead(200, head)
  fs.createReadStream(path).pipe(res)
}
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
