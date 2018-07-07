import React, { Component } from 'react';
import { Modal, Button, Icon, Row, Col } from 'react-materialize';
import { Link } from 'react-router-dom';
import { Route, HashRouter } from 'react-router-dom';

import './Search.css';
import SearchParams from './SearchParams/SearchParams';
import GenreSearch from './GenreSearch/GenreSearch';
import RatingSearch from './RatingSearch/RatingSearch';
import ExtraSearch from './ExtraSearch/ExtraSearch';

class Search extends Component  {


	render() {
		return (
			<div className="film-search">
				<div className="input-field">
					<input id="search" type="search" required className="film-search-input"/>
					<label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
					<i className="material-icons">close</i>
				</div>
				<ul className="collapsible">
					<li>
						<div className="collapsible-header"><i className="material-icons">settings</i>Search settings</div>
						<div className="collapsible-body params">
							<GenreSearch />
							<RatingSearch />
							<ExtraSearch />
						</div>
					</li>
				</ul>
			</div>


		)
	}
}
export default Search;
// <ul className="collapsible film-search">
// </ul>


// <li>
// 	<div className="collapsible-header"><Link to="/library/search/genre"><i className="material-icons">local_movies</i>Genre</Link></div>
// 	<div className="collapsible-body params"><span>Lorem ipsum dolor sit amet.</span></div>
// </li>
