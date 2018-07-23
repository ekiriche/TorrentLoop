import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom';

import { DefaultPlayer as Video } from 'react-html5video';

import './styles.css';

class VideoPlayer extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			movie: this.props.movieData,
			moviePath: this.props.moviePath,
			subtitles: this.props.subtitles,
		}
	}
	render() {

		const subtitles = this.state.subtitles
		const location = "http://localhost:8100/movies/" + this.state.movie.imdb_code + '/';
		const listSubtitles = subtitles.map((subtitle, i) =>
				<track key={i} kind="subtitles" label={subtitle.language} srcLang={subtitle.language} src={location + subtitle.language + '.vtt'} />
			)

		return (
				<Video autoPlay loop muted ref="video"
						controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen', 'Captions']}
						poster={this.state.movie.background_image}
						onCanPlayThrough={() => {
							this.refs.video.videoEl.pause();
						}}>
						<source src={this.state.moviePath} type="video/webm" />
						{listSubtitles}
				</Video>
		);
	}
}
export default VideoPlayer;
