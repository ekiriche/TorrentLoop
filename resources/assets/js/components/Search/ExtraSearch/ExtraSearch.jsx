import React, { Component } from 'react';
import { Row, Input, Col } from 'react-materialize';
import { Link } from 'react-router-dom';

import { Route, HashRouter } from 'react-router-dom';

import './ExtraSearch.css';

class ExtraSearch extends Component  {

	render() {
		return (
			<div className="extra-search">
				<Row className="genre-settings"><i className="material-icons">sort</i>Genre</Row>
				<Col>
					<Input s={6} label="Year" />
				</Col>

				<Col>
					<span>Sort by:</span>
					<Input name='group3' type='radio' value='latest' label='Latest' />
					<Input name='group3' type='radio' value='oldest' label='Oldest' />
					<Input name='group3' type='radio' value='year' label='Year' />
					<Input name='group3' type='radio' value='rating' label='Rating' />
				</Col>
			</div>
		)
	}
}
export default ExtraSearch;
