import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';

import OAuth from '../OAuth/OAuth';
import './Signin.css';

class Signin extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			login: '',
			password: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getValueFromForm = this.getValueFromForm.bind(this);
	}

	getValueFromForm(event) {
		if (event.target.name === 'login') {
			this.setState({ [event.target.name] : event.target.value.toLowerCase() });
		}
		else
		this.setState({[event.target.name]: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		//PostData('signup', this.state).then ((result) => {
		//console.log(result);
		//})
		console.log(this.state.login);
		console.log(this.state.password);
	}

	render() {
		return (
			<Row>
				<form onSubmit={this.handleSubmit} >
					<h5>Sign in</h5>
					<Input label="Login" s={12} name="login"required onChange={this.getValueFromForm} />
					<Input type="password" label="Password" required name="password" s={12} onChange={this.getValueFromForm} />
					<div className="col input-field s12 OAuth-position">
						<Button waves='light'>Sign in</Button>
						<OAuth />
					</div>
				</form>
			</Row>
		);
	}
}
export default Signin;
