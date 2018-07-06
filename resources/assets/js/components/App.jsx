import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { LocalizeProvider, localizeReducer } from 'react-localize-redux';
import ReactDOM from 'react-dom';
import Auth from './Auth/Auth';

const USING_REDUX_KEY = 'redux';

import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.onToggleReduxClick = this.onToggleReduxClick.bind(this);

		const isUsingReduxFromLocalStorage = window.localStorage.getItem(USING_REDUX_KEY)
		? window.localStorage.getItem(USING_REDUX_KEY) === 'true'
		: false;

		const store = isUsingReduxFromLocalStorage === false
		? undefined
		: this.getReduxStore();

		this.state = {
			isUsingRedux: isUsingReduxFromLocalStorage,
			store
		};
	}

	getReduxStore() {
		return createStore(combineReducers({
			localize: localizeReducer
		}), composeWithDevTools());
	}

	onToggleReduxClick() {
		const nextIsUsingRedux = !this.state.isUsingRedux;

		window.localStorage.setItem(USING_REDUX_KEY, nextIsUsingRedux);
		window.location.reload();
	}
	render() {
		return (
			<LocalizeProvider store={this.state.store}>
				<Auth onToggleClick={this.onToggleReduxClick} toggleValue={this.state.isUsingRedux}/>
			</LocalizeProvider>
		);
	}
}

if (document.getElementById('root')) {
	ReactDOM.render(<App />, document.getElementById('root'));
}
