import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { CardPanel, Col, Row } from 'react-materialize';
import Auth from './Auth/Auth';
import Library from './Library/Library';

import './App.css';

export default class App extends Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path="/" component={Auth} />
					<Route path="/library" component={Library} />
				</div>
			</HashRouter>
		);
	}
}

if (document.getElementById('root')) {
	ReactDOM.render(<App />, document.getElementById('root'));
}
