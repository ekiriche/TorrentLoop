import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CardPanel, Col, Row } from 'react-materialize';
import Auth from './Auth/Auth';

import './App.css';

export default class App extends Component {
	render() {
		return (
			<Auth />
		);
	}
}

if (document.getElementById('root')) {
	ReactDOM.render(<App />, document.getElementById('root'));
}
