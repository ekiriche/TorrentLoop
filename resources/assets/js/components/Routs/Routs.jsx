import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest}) => (
	<Route {...rest} render={props => (
			localStorage.getItem('accessToken')
			? <Component {...props} />
		: <Redirect to={{ pathname: '/', state: { from: props.location } }} />
)} />
)

export const SingInRoute = ({ component: Component, ...rest}) => (
	<Route {...rest} render={props => (
			localStorage.getItem('accessToken')
			? <Redirect to={{ pathname: '/library', state: { from: props.location } }} />
		: <Component {...props} />
)} />
)
