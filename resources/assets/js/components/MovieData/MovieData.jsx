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

import { Card, CardTitle , Col,Chip} from 'react-materialize';

class MovieData extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			movie: this.props.movieData
		}
	}


	render() {
		console.log(this.props.movieData);

		const genres = this.state.movie.genres /*List of users who view profile*/
		const listGenres = genres.map((genres, i) =>
				<li key={i}>
					<Chip className="chips-profile-view">
						<p >{genres}</p>
					</Chip>
				</li>
			)

		return (
			<Col m={7} s={12}>
				<Card horizontal header={<CardTitle image={this.state.movie.large_cover_image}></CardTitle>}>
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
				</Card>
			</Col>
		);
	}
}
export default withLocalize(MovieData);
