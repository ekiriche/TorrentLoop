import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom';

import './Library.css';

import Search from '../Search/Search';
import Navbar from '../Navbar/Navbar';
import Foot from '../Footer/Footer';
import FilmSet from '../FilmSet/FilmSet';

class Library extends Component  {

	render() {
		return (
			<div className="library-flex">
				<Navbar />
				<div className="library">
					<Search />
					<FilmSet />
				</div>
				<Foot />
			</div>
		);
	}
}
export default Library;

	//
