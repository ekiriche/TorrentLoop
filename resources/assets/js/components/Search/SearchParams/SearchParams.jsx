import React, { Component } from 'react';
import { Modal, Button, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';

import { Route, HashRouter } from 'react-router-dom';

import './SearchParams.css';
import GenreSearch from '../GenreSearch/GenreSearch';

class SearchParams extends Component  {


	render() {
		return (
			<HashRouter>
				<div>
					<Route path="/library/search/genre" component={ GenreSearch } />
				</div>
			</HashRouter>
		)
	}
}
export default SearchParams;


// <HashRouter>
// 	<div>
// 		<Route path="/library/search/rating" component={Auth} />
// 		<Route path="/library/search/year" component={Library} />
// 		<Route path="/library/search/genre" component={Library} />
// 	</div>
// </HashRouter>
