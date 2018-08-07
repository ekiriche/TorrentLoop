import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom';

import { DefaultPlayer as Video } from 'react-html5video';
import ReactPlayer from 'react-player';

import './styles.css';

class VideoPlayer extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			movie: this.props.movie,
			moviePath: this.props.src,
			subtitles: this.props.subtitles,
			subtitlesArr: ''

		}
	}
	componentWillMount() {



		if (this.state.subtitles) {
			let id =this.state.movie.imdb_code;
			let SubtitlesArr = this.state.subtitles.map((arr) => ({
				...arr,
				'imdb-id': id,
				'kind': 'subtitles',
				'srcLang': arr.language
			}));
			SubtitlesArr.forEach( function(obj) { obj.src = 'http://localhost:8100/movies/'+ obj['imdb-id'] + '/' + obj.language + '.vtt'; } );
			this.setState({subtitlesArr: SubtitlesArr});

		}

	}

	render() {

		return (<ReactPlayer
			playing
			controls = {true}
			url={this.state.moviePath}
			config={{ file: {
				tracks: this.state.subtitlesArr
			}}}
			width='100%'
			height='100%'/>
	)

	}
}
export default VideoPlayer;
/*<ReactPlayer
	playing
	controls = {true}
	url={this.state.moviePath}
	config={{ file: {
		tracks: this.state.subtitlesArr
	}}}
	width='100%'
	height='100%'
	/>
	*/
