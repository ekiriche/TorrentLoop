import React, { Component } from 'react';
import { Card, CardTitle } from 'react-materialize';
import { CSSTransitionGroup } from 'react-transition-group';
import { Redirect, Link } from 'react-router-dom';
import Movie from '../Movie/Movie';


// import ReactDelayRender from 'react-delay-render';

// import { Link } from 'react-router-dom';

import './FilmLink.css';

class FilmLink extends Component  {

	constructor(props) {
		super(props);
		this.state = {
			movie: '',
			pathid: 454645,
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
		let objArray = this.props.movieObj;
		let obj = objArray.find((document) => document.id == id);
		this.setState({movie: obj, pathid: id});
	}

	render() {
/*
		if (this.state.result) {
			return (
				<Route>
					<Redirect to={{
					      pathname: '/Movie/:id',
					      state: { movie: this.state.movie}
					    }} />
				</Route>
				);
		}
*/
console.log(this.state.pathid);
		return (
			<div className="film-link" style={{"transitionDelay":(this.props.delay*30)+"ms"}} >
				<div className="film-cover" style={{backgroundImage: 'url(' + this.props.cover + ')'}}>
					{(this.state.result)
						?
							<Link
								to={{ pathname: `/Movie/${this.state.pathid}`, state: { movie: this.state.movie}}}
								onClick={ this.handleMuvieSet }><i id={this.props.movieId} className="material-icons medium film-icon">pageview</i>
							</Link>
						:
							<a onClick={ this.handleMuvieSet }><i id={this.props.movieId} className="material-icons medium film-icon">pageview</i></a>
				}

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
// export default ReactDelayRender({ delay: 5000 })(FilmLink);

export default FilmLink;

/*
<Link to={{
	pathname: '/Movie',
	state: { movie: this.state.movie}
}} onClick={ this.handleMuvieSet }><i id={this.props.movieId} className="material-icons medium film-icon">pageview</i></Link>
*/



// <div className="production-year">2012</div>
// <div className="imdb-rating">Imdb: 7.7</div>
// url("../../../../../storage/app/public/avengers1.jpeg")

// <div className="film-cover"></div>

// const imgUrlStyle = {
// 	backgroundImage: 'url(' + this.props.cover + ')'
// };
/*			<CSSTransitionGroup
				transitionName="example"
				transitionAppear={true}
				transitionAppearTimeout={ 1000 }
				transitionEnter={false}
				transitionLeave={false}>
							</CSSTransitionGroup>*/
