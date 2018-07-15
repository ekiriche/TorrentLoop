import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
/*localization*/
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations from '../translations/global.json';
import ToggleButton from 'react-toggle-button';
/*localization end*/

import './MovieData.css';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { PostData } from '../../functions/PostData';
import { Card, CardTitle , Col,Chip} from 'react-materialize';

class MovieData extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			movie: this.props.movieData,
			download: false,
			subtitles: '',
			downloadPercent: 0
		};
		this.startDownload = this.startDownload.bind(this);
		this.getDownloadPercentage = this.getDownloadPercentage.bind(this);
	}

	startDownload() {
		PostData('movie/download-movie', { 'imdb-id': this.state.movie.imdb_code }).then ((result) => {
		});
		PostData('movie/download-subtitles', { 'imdb-id': this.state.movie.imdb_code }).then ((result) => {
			this.setState({subtitles: result});
			this.setState({ download : true});
		})
	}

	getDownloadPercentage() {
		PostData('movie/get-download-percentage', { 'imdb-id': this.state.movie.imdb_code }).then ((result) => {
			this.setState({downloadPercent: result});
		})
	}

	render() {

		if (this.state.subtitles === false) {
			return (
				<div className="progress">
					<div className="indeterminate"></div>
				</div>
			)
		}

		const genres = this.state.movie.genres
		const listGenres = genres.map((genres, i) =>
		<li key={i}>
			<Chip className="chips-profile-view">
				<p >{genres}</p>
			</Chip>
		</li>
	);

	return (
		<Col m={7} s={12}>
			<Card horizontal header={<CardTitle image={this.state.movie.large_cover_image}></CardTitle>}>
				<div className="MovieData-position">
						<h5>{this.state.movie.title}</h5>
						<h6>Discription</h6>
						{this.state.movie.description_full}
						<h6>Genres</h6>
						<div className="ganres-list">
							{listGenres}
						</div>
						<h6>Rating</h6>
						{this.state.movie.rating}
						<h6>Time</h6>
						{this.state.movie.runtime}
						<h6>Year</h6>
						{this.state.movie.year}
						{(!this.state.download)
							? <a className="waves-effect waves-light btn" onClick={this.startDownload}><i className="material-icons left">cloud_download</i>Watch</a>
							: <a className="btn disabled" ><i className="material-icons left">cloud_download</i>Watch</a>}
						{(this.state.download)
						? <div className="progress percentLoader"><div className="determinate" style={{width: this.state.downloadPercent + '%'}}></div></div>
						: null}
				</div>
				{(this.state.download) ? <VideoPlayer subtitles={this.state.subtitles} movieData={this.state.movie}/> : null}
			</Card>
		</Col>
	);
	}
}
export default withLocalize(MovieData);
