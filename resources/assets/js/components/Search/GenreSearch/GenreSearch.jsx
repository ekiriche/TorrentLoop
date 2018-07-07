import React, { Component } from 'react';
import { Row, Input, Col } from 'react-materialize';
import { Link } from 'react-router-dom';

import { Route, HashRouter } from 'react-router-dom';
import Nouislider from 'react-nouislider';

import './GenreSearch.css';

class GenreSearch extends Component  {


	render() {
		return (
			<div>
				<Row className="genre-settings"><i className="material-icons">local_movies</i>Genre</Row>
				<Col>
					<Input name='group1' type='radio' value='all' label='All' />
					<Input name='group1' type='radio' value='animation' label='Animation' />
					<Input name='group1' type='radio' value='crime' label='Crime' />
					<Input name='group1' type='radio' value='family' label='Family' />
					<Input name='group1' type='radio' value='horror' label='Horror' />
					<Input name='group1' type='radio' value='news' label='News' />
					<Input name='group1' type='radio' value='thriller' label='Thriller' />
				</Col>

				<Col>
					<Input name='group1' type='radio' value='action' label='Action' />
					<Input name='group1' type='radio' value='biography' label='Biography' />
					<Input name='group1' type='radio' value='documentary' label='Documentary' />
					<Input name='group1' type='radio' value='fantasy' label='Fantasy' />
					<Input name='group1' type='radio' value='music' label='Music' />
					<Input name='group1' type='radio' value='sci-fi' label='Science Fiction' />
					<Input name='group1' type='radio' value='war' label='War' />
					<Input name='group1' type='radio' value='western' label='Western' />
				</Col>
			</div>
		)
	}
}
export default GenreSearch;
