import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { CSSTransitionGroup } from 'react-transition-group';
import { withLocalize, Translate } from 'react-localize-redux';

import { Link } from 'react-router-dom';
import FilmLink from '../FilmLink/FilmLink';
import SideNav, {MenuIcon} from 'react-simple-sidenav';

import Search from './Search/Search';


import './FilmSet.css';
import GetFilmsInfo from '../../functions/GetFilmsInfo';

class FilmSet extends Component  {

	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			pas: false,
			page: 1,
			request: "list_movies.json?sort_by=rating&limit=" + 48 + "&page="
		}
		this.requestFilms = this.requestFilms.bind(this);
		this.loadNewPage = this.loadNewPage.bind(this);
		this.updateRequest = this.updateRequest.bind(this);
	}

	componentWillMount() {
		this.setState({ page: 1 });
		let request = this.state.request + this.state.page;
		GetFilmsInfo(request)
		.then ((result) => {
			this.setState({ movies: result.data.movies});
			this.setState({ page: this.state.page + 1 });
			this.setState({ pas: true });
			
		});
	}

	requestFilms() {
		let request = this.state.request + this.state.page;
		GetFilmsInfo(request)
		.then ((result) => {
			if (result.data.movies) {
				let tmp = this.state.movies;
				for (let i = 0; i < result.data.movies.length; i++) {
					tmp.push(result.data.movies[i]);
				}
				this.setState({ movies: tmp});
				this.setState({ pas: true });
			}
		})
	}

	loadNewPage() {
		let node = document.getElementsByClassName('film-set')[0];
		const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
		if (bottom) {
			this.setState({ page: this.state.page + 1});
			this.requestFilms();
		}
	}


	updateRequest(data) {
		if (data) {
			this.setState({ page: 1, request: data }, () => {
				let request = this.state.request + this.state.page;

				GetFilmsInfo(request)
				.then ((result) => {
					if (result.data.movies) {
						this.setState({ movies: result.data.movies});
						this.setState({ page: this.state.page + 1 });
						this.setState({ pas: true });
					}
				});
			});
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
				movieId={movie.id}
				movieObj={movies}
				/>
		)
		return (
			<div>
				<i className="material-icons search" onClick={() => this.setState({showSearchParams: true})}>search</i>
				<div className="film-set"
					onScroll={ this.loadNewPage }
					ref={ scroller => {
						this.scroller = scroller
					}}
					>
					{allFilms}
				</div>
				<SideNav
					openFromLeft={true}
					showNav={this.state.showSearchParams}
					onHideNav={()=>this.setState({showSearchParams: false})}
					title={<Translate id="search-main-title">Search</Translate>}
					titleStyle={{backgroundColor: '#0E0B18', fontSize: '2.2rem', textAlign: 'center'}}
					itemStyle={{display: 'inlineGrid', width: '100%', textAlign: 'center', backgroundColor: '#0E0B18'}}
					itemHoverStyle={{backgroundColor: '#0E0B18'}}
					items={[
						<Search handlerFilmRequest={this.updateRequest}/>
					]} />
				</div>
			);
		}
	}
	export default withLocalize(FilmSet);
	/*					{allFilms}*/
	// var h = element.clientHeight;
