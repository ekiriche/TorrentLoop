import React, { Component } from 'react';
import { Card, CardTitle } from 'react-materialize';
import { CSSTransitionGroup } from 'react-transition-group'


// import ReactDelayRender from 'react-delay-render';

// import { Link } from 'react-router-dom';

import './FilmLink.css';

class FilmLink extends Component  {

	constructor(props) {
		super(props);
		console.log(this.props.delay);
	}

	render() {

		return (
			<CSSTransitionGroup
				transitionName="example"
				transitionAppear={true}
				transitionAppearTimeout={ 1000 }
				transitionEnter={false}
				transitionLeave={false}>
				<div className="film-link" style={{"transitionDelay":(this.props.delay*30)+"ms"}}>
					<div className="film-cover" style={{backgroundImage: 'url(' + this.props.cover + ')'}}></div>
					<div className="film-name white-text"><h6>{ this.props.name }</h6></div>
					<div className="film-info">
						<div className="production-year white-text"><h6>Year: { this.props.year }</h6></div>
						<div className="imdb-rating white-text"><h6 >Imdb: { this.props.rating }</h6></div>
					</div>
				</div>
			</CSSTransitionGroup>
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
