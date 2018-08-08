
import React, { Component } from 'react';
import { Modal, Button, Icon, Row, Col } from 'react-materialize';
import { Route, HashRouter, Redirect } from 'react-router-dom';



import './Search.css';
import GenreSearch from './GenreSearch/GenreSearch';
import RatingSearch from './RatingSearch/RatingSearch';
import ExtraSearch from './ExtraSearch/ExtraSearch';
import OrderBy from './OrderBy/OrderBy';

import GetFilmsInfo from '../../../functions/GetFilmsInfo';


class Search extends Component  {

	constructor(props) {
		super(props);

		this.handleSort = this.handleSort.bind(this);
		this.handleGenre = this.handleGenre.bind(this);
		this.handleRating = this.handleRating.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleOrder = this.handleOrder.bind(this);
		this.findFilm = this.findFilm.bind(this);

		this.state = {
			movies: [],
			title: '',
			toFind: '',
			genre: '',
			sortBy: 'rating',
			orderBy: 'desc',
			minRating: 0,
			redirect: false
		}
	}

	handleChange(event) {
		this.setState({
			title: event.target.value
		});
	}

	handleRating(data) {
		this.setState({
			minRating: data
		});
	}

	handleGenre(data) {
		this.setState({
			genre: data
		});
	}

	handleSort(data) {
		this.setState({
			sortBy: data
		});
	}

	handleOrder(data) {
		this.setState({
			orderBy: data
		});
	}

	findFilm() {
		this.props.handlerFilmRequest("list_movies.json?sort_by=" + this.state.sortBy + "&order_by=" + this.state.orderBy + "&genre=" + this.state.genre + "&minimum_rating=" + this.state.minRating + "&query_term=" + this.state.title + "&limit=" + 48 + "&page=");
	}

	render() {

		return (
			<div>
				<div className="input-field input-search">
					<input
						id="search"
						type="search"
						required
						value={this.state.title}
						onChange={this.handleChange}/>
					<label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
					<i className="material-icons">close</i>
				</div>
				<hr />
				<RatingSearch minRating={this.handleRating} />
				<hr />
				<GenreSearch genreToFind={this.handleGenre} />
				<hr />
				<ExtraSearch sortBy={this.handleSort} />
				<hr />
				<OrderBy orderBy={this.handleOrder} />
				<hr />
				<Button waves='light' onClick={this.findFilm}>Find</Button>
			</div>
		)
	}
}
export default Search;
