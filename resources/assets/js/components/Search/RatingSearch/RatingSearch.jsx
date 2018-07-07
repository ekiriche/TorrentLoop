import React, { Component } from 'react';
import { Row, Input, Col } from 'react-materialize';
import { Link } from 'react-router-dom';

import { Route, HashRouter } from 'react-router-dom';
import Nouislider from 'react-nouislider';

import './RatingSearch.css';

class RatingSearch extends Component  {


	render() {
		return (
			<div>
				<Row className="genre-settings"><i className="material-icons">grade</i>Rating</Row>
				<Col>
					<Input name='group2' type='radio' value='0' label='All' />
					<Input name='group2' type='radio' value='1' label='1+' />
					<Input name='group2' type='radio' value='2' label='2+' />
					<Input name='group2' type='radio' value='3' label='3+' />
					<Input name='group2' type='radio' value='4' label='4+' />
					<Input name='group2' type='radio' value='5' label='5+' />
					<Input name='group2' type='radio' value='6' label='6+' />
					<Input name='group2' type='radio' value='7' label='7+' />
					<Input name='group2' type='radio' value='8' label='8+' />
					<Input name='group2' type='radio' value='9' label='9+' />
				</Col>
			</div>
		)
	}
}
export default RatingSearch;
