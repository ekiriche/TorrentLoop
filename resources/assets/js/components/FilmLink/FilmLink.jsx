import React, { Component } from 'react';
import { Card, CardTitle } from 'react-materialize';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';


// import ReactDelayRender from 'react-delay-render';

// import { Link } from 'react-router-dom';

import './FilmLink.css';

class FilmLink extends Component  {

	constructor(props) {
		super(props);
		this.handleMuvieSet = this.handleMuvieSet.bind(this);
	}
	handleMuvieSet(event) {
		var id = event.target.id;
		let objArray = this.props.movieObj;
		var obj = objArray.find((document) => document.id == id);
		console.log(obj);
	}

	render() {

		return (
			<div className="film-link" style={{"transitionDelay":(this.props.delay*30)+"ms"}} onClick={ this.handleMuvieSet }>
				<div className="film-cover" id={this.props.movieId} style={{backgroundImage: 'url(' + this.props.cover + ')'}}>
					<Link to="/Movie" ><i className="material-icons medium film-icon">pageview</i></Link>
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
