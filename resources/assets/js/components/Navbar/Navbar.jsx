import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';


import LanguageToggle from '../Library/LanguageToggle';
import './Navbar.css';

class Navbar extends Component {
	render() {
		return (
			<nav>
				<div className="nav-wrapper container nav-wrapper-flex">
					<a href="#" className="brand-logo">Hypertube<i className="fas fa-film  fa-2x" aria-hidden="true"></i></a>
					<LanguageToggle />
				</div>
			</nav>
		);
	}
}

export default Navbar;
