import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';

import { Link } from 'react-router-dom';
import FilmLink from '../FilmLink/FilmLink';

import './FilmSet.css';
import GetFilmsInfo from '../../functions/GetFilmsInfo';

class FilmSet extends Component  {

	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			pas: false,
			preloader1: true,
			preloader2: true,
			page: 1
		}
		this.requestFilms = this.requestFilms.bind(this);
		this.loadNewPage = this.loadNewPage.bind(this);
	}
	componentWillMount() {
		this.setState({ page: 1 });
		var limit = 48;
		let page = this.state.page;
		const params = "?sort_by=rating&limit=" + limit + "&page=" + page;
		GetFilmsInfo(params)
		.then ((result) => {
			this.setState({ movies: result.data.movies});
			// console.log(this.state);
			this.setState({ page: this.state.page + 1 });
			this.setState({ pas: true });
		});
	}

	requestFilms() {
		var limit = 48;
		let page = this.state.page;
		const params = "?sort_by=rating&limit=" + limit + "&page=" + page;
		if (page % 2)
			this.setState({ preloader1: false });
		else
			this.setState({ preloader2: false });
		GetFilmsInfo(params)
		.then ((result) => {
			let tmp = this.state.movies;
			for (let i = 0; i < result.data.movies.length; i++) {
				tmp.push(result.data.movies[i]);
			}
			// console.log(tmp);
			this.setState({ movies: tmp});
			this.setState({ pas: true });
			if (page % 2)
				this.setState({ preloader1: true });
			else
				this.setState({ preloader2: true });
		})
	}

	loadNewPage() {

		let node = document.getElementsByClassName('film-set')[0];
		const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
		// console.log(this.state.preloader1);
		// console.log(this.state.preloader2);
		if (bottom && this.state.preloader1 === true && this.state.preloader2 === true) {
			// console.log(this.state.page);
			this.setState({ page: this.state.page + 1});
			this.requestFilms();
		}
	}

	render() {
		if (this.state.pas === false) {
			return (
				<div className="progress">
					<div className="indeterminate"></div>
				</div>
			)
		}
		const movies = this.state.movies;
		const allFilms = movies.map(
			(movie, i) =>
			<FilmLink
				key={i}
				delay={i % 48}
				cover={movie.medium_cover_image}
				name={movie.title_english}
				year={movie.year}
				rating={movie.rating}
				/>
		)

		return (
			<div>
				<div className="film-set"
					onScroll={ this.loadNewPage }
					ref={ scroller => {
						this.scroller = scroller
					}}
					>

				</div>
			</div>
		);
	}
}
export default FilmSet;
/*					{allFilms}*/
// var h = element.clientHeight;
