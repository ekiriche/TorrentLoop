const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
const axios = require('axios');
const srt2vtt = require('srt-to-vtt');
const request = require('request');
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

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));
schedule.scheduleJob('*/1 * * * *', function() {
	axios.get('http://localhost:8100/movie/delete-not-watched-films').then (result => {
		console.log('Schedule: ', result.data);
	})
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/index.html'))
});

app.post('/get-stream', function(req, res) {
	//console.log(123);
	console.log(1);
	if (!fs.existsSync('public/downloaded_movies'))
	fs.mkdir('public/downloaded_movies');
	if (!fs.existsSync('public/not_downloaded_movies'))
	fs.mkdir('public/not_downloaded_movies');
	if (!fs.existsSync('public/subtitles'))
	fs.mkdir('public/subtitles');

	torrentFile = req.body.torrent;
	res.send('DONE');
});

app.get('/video/:id', function(req, res) {
	console.log(2);
	if (req.params.id in moviesArr) {
		console.log(3);
		console.log('***************************************************************')
		console.log('ARRAY', moviesArr);
		console.log('***************************************************************')
		moviePath = moviesArr[req.params.id];
		request.post(
			{
				url:'http://localhost:8100/movie/add-film-to-db',
				form: {
					path: moviePath,
					timeToDelete: Math.floor(new Date / 1000) + 2592000
				}
			},
			function(err,httpResponse,body) {

				// console.log(err);
				// console.log(body);
			}
		)
		// moviesArr[requestId][deleteDate] = Math.floor(date / 1000) + 2592000;
	} else {
		console.log(4);
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
					request.post(
						{
							url:'http://localhost:8100/movie/add-film-to-db',
							form: {
								path: moviePath,
								timeToDelete: Math.floor(new Date / 1000) + 2592000
							}
						},
						function(err,httpResponse,body) {

							// console.log(err);
							// console.log(body);
						}
					)
					// moviesArr[requestId][deleteDate] = Math.floor(date / 1000) + 2592000;
				}
			})
		})
	});
}
setTimeout(() => {
	let path = moviePath;
	let stat = fs.statSync(path);
	let range = req.headers.range;
	let fileSize = req.query.movieSize;
	//let fileSize = 360000000;

	// if (range) {
	// 	console.log(5);
	// 	let parts = range.replace(/bytes=/, "").split("-");
	// 	let start = parseInt(parts[0], 10);
	// 	let end = parts[1]
	// 	? parseInt(parts[1], 10)
	// 	: fileSize-1;
	// 	let chunksize = (end-start)+1;
	// 	console.log('***************************************************************')
	// 	console.log('HEADER', req.headers);
	// 	console.log('RANGE', range);
	// 	console.log('START', start);
	// 	console.log('END', end);
	// 	console.log('CHUNKSIZE', chunksize);
	// 	console.log('***************************************************************')
	// 	let file = fs.createReadStream(path, {start, end});
	// 	let head = {
	// 		'Content-Range': `bytes ${start}-${end}/${fileSize}`,
	// 		'Accept-Ranges': 'bytes',
	// 		'Content-Length': chunksize,
	// 		'Content-Type': 'video/mp4',
	// 	};
  //
	// 	res.writeHead(206, head);
	// 	file.pipe(res);
	// } else {
	// 	console.log(4);
	// 	let head = {
	// 		'Content-Length': fileSize,
	// 		'Content-Type': 'video/mp4',
	// 	};
	// 	res.writeHead(200, head);
	// 	fs.createReadStream(path).pipe(res);
	// }
	if (range) {
		console.log(4);
		let head = {
			'Content-Length': fileSize,
			'Content-Type': 'video/mp4',
		};
		res.writeHead(200, head);
		fs.createReadStream(path).pipe(res);
	} else {

	}
}, 15000);
//
// console.log('moviePath', moviePath);
// let path = moviePath;
// let stat = fs.statSync(path);
// // console.log(stat);
// let range = req.headers.range;
//
// if (range) {
// 	let parts = range.replace(/bytes=/, "").split("-");
// 	let start = parseInt(parts[0], 10);
// 	let end = parts[1]
// 	? parseInt(parts[1], 10)
// 	: fileSize-1;
// 	let chunksize = (end-start)+1;
//
// 	console.log('chunksize ', chunksize);
// 	let file = fs.createReadStream(path, {start, end});
// 	let head = {
// 		'Content-Range': `bytes ${start}-${end}/${fileSize}`,
// 		'Accept-Ranges': 'bytes',
// 		'Content-Length': chunksize,
// 		'Content-Type': 'video/mp4',
// 	};
//
// 	res.writeHead(206, head);
// 	file.pipe(res);
// } else {
// 	let head = {
// 		'Content-Length': fileSize,
// 		'Content-Type': 'video/mp4',
// 	};
// 	res.writeHead(200, head);
// 	fs.createReadStream(path).pipe(res);
// }

});

app.listen(3000, function () {
	console.log('Listening on port 3000!')
});
