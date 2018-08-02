import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
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

import Comments from '../Comments/Comments';

class MovieData extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			movie: this.props.movieData,
			download: false,
			subtitles: '',
			downloadPercent: 0
		}
		this.startDownload = this.startDownload.bind(this);
		this.getDownloadPercentage = this.getDownloadPercentage.bind(this);
	}

	componentWillMount(){
		let jwt = localStorage.getItem('accessToken');
		let user = jwtDecode(jwt);
		axios.post('http://localhost:8100/auth/token-update', {'id' : user.uid, 'jwt' : jwt}).then (result => {
			if (result.data == 'expired')
				localStorage.removeItem('accessToken');
		});
		console.log("result");
	}

	startDownload(event) {
		let jwt = localStorage.getItem('accessToken');
		let user = jwtDecode(jwt);
		/*PostData('profile/save-history', {
			'movie_id': this.state.movie.id,
			'imdb_code': this.state.movie.imdb_code,
			'medium_cover_image': this.state.movie.medium_cover_image,
			'title_english': this.state.movie.title_english,
			'year': this.state.movie.year,
			'rating': this.state.movie.rating,
			'user_id': user.uid
		}).then ((result) => {
			console.log(result);
		});*/
		setTimeout(function() {
		PostData('movie/download-movie', { 'imdb-id': this.state.movie.imdb_code }).then ((moviepath) => {
			console.log(moviepath);
			this.setState({ moviePath : moviepath });
			this.setState({ download : true });
	/*		setTimeout(function() {
				PostData('movie/download-subtitles', { 'imdb-id': this.state.movie.imdb_code }).then ((result) => {
					this.setState({ subtitles: result });
					this.setState({ download : true });
					})
				}.bind(this), 7000); */
			})
		}.bind(this), 7000);
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
	)

	const videoQuality = this.state.movie.torrents
	const videoQualityList = videoQuality.map((size, i) =>
		<li key={i}>
			<a className="waves-effect waves-light btn" onClick={this.startDownload} id={size.quality}>
				<i className="material-icons left" >cloud_download</i>{size.quality}</a>
		</li>
	)


console.log(this.state.movie);
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
						<div className="videoQuality">
							{(!this.state.download) ? videoQualityList : null}
						</div>
				</div>
			</Card>
			<Comments data={this.state.movie}/>
		</Col>
	);
	}
}
export default withLocalize(MovieData);
/*
{(!this.state.download)
	? <a className="waves-effect waves-light btn" onClick={this.startDownload}><i className="material-icons left">cloud_download</i>Watch</a>
	: <a className="btn disabled" ><i className="material-icons left">cloud_download</i>Watch</a>}
{(this.state.download)
? <div className="progress percentLoader"><div className="determinate" style={{width: this.state.downloadPercent + '%'}}></div></div>
: null}
*/
