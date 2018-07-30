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
			moviePath: this.props.moviePath,
		}
	}
	render() {

			return <ReactPlayer url={this.state.moviePath} playing controls='true' preload='true'/>

	}
}
export default VideoPlayer;


/*
const subtitles = this.state.subtitles
const location = "http://localhost:8100/movies/" + this.state.movie.imdb_code + '/';
const listSubtitles = subtitles.map((subtitle, i) =>
		<track key={i} kind="subtitles" label={subtitle.language} srcLang={subtitle.language} src={location + subtitle.language + '.vtt'} />
	)
	*/
