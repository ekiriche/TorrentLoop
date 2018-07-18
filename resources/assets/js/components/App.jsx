import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { LocalizeProvider, localizeReducer } from 'react-localize-redux';
import ReactDOM from 'react-dom';
import Auth from './Auth/Auth';
import Library from './Library/Library';
import Movie from './Movie/Movie';
import axios from 'axios';

import EditProfile from './EditProfile/EditProfile';
import ViewProfile from './Profile/ViewProfile';
import { PrivateRoute, SingInRoute } from './Routs/Routs';

const USING_REDUX_KEY = 'redux';

import './App.css';
import './Global.css';


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
			<HashRouter>
				<LocalizeProvider store={this.state.store}>
					<SingInRoute exact path="/" component={Auth} onToggleClick={this.onToggleReduxClick} toggleValue={this.state.isUsingRedux}/>
					<PrivateRoute path="/library" component={Library} onToggleClick={this.onToggleReduxClick} toggleValue={this.state.isUsingRedux} request={"list_movies.json?sort_by=rating&limit=" + 48 + "&page=" + 1}/>
					<PrivateRoute path="/movie/:id" component={Movie} onToggleClick={this.onToggleReduxClick} toggleValue={this.state.isUsingRedux}/>
					<PrivateRoute path="/settings" component={EditProfile} onToggleClick={this.onToggleReduxClick} toggleValue={this.state.isUsingRedux}/>
					<PrivateRoute path="/profile/:id" component={ViewProfile} onToggleClick={this.onToggleReduxClick} toggleValue={this.state.isUsingRedux}/>
				</LocalizeProvider>
			</HashRouter>
		);
	}
}

if (document.getElementById('root')) {
	ReactDOM.render(<App />, document.getElementById('root'));
}
