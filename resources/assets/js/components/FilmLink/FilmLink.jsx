import React, { Component } from 'react';
import { Card, CardTitle } from 'react-materialize';
import { CSSTransitionGroup } from 'react-transition-group';
import { Redirect, Link } from 'react-router-dom';
import Movie from '../Movie/Movie';

import './FilmLink.css';

class FilmLink extends Component  {

	constructor(props) {
		super(props);
		this.state = {
			movie: '',
			pathid: '',
			result: false
		}
		this.handleMuvieSet = this.handleMuvieSet.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.movie > prevState.movie) {
			this.setState({result: true});
		}
	}

	handleMuvieSet(event) {
		let id = event.target.id;
		this.setState({pathid: id});
	}

	render() {
		return (
			<div className="film-link" style={{"transitionDelay":(this.props.delay*100)+"ms"}} >
				<div className="film-cover" style={{backgroundImage: 'url(' + this.props.cover + ')'}}>
					<Link
						to={{ pathname: `/Movie/${this.props.movieId}`, state: { movie: this.state.movie}}}
						onClick={ this.handleMuvieSet }>
						<i id={this.props.movieId} className="material-icons medium film-icon">pageview</i>
					</Link>

				</div>
				<div className="film-name white-text"><h6>{ this.props.name }</h6></div>
				<div className="film-info">
					<div className="production-year white-text"><h6>Year: { this.props.year }</h6></div>
					<div className="imdb-rating white-text"><h6 >Imdb: { this.props.rating }</h6></div>
				</div>
			</div>
		);
	}
}

export default FilmLink;
