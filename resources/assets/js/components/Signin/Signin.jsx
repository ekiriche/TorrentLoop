import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { PostData } from '../../functions/PostData';

import history from '../History/History';

import { withLocalize, Translate } from 'react-localize-redux';


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
		let returnText;
		const langCode = this.props.activeLanguage.code;
		const confirmMessage = {
			error: ['Invalid login or password', 'Невірний логін або пароль']
		}

		if (langCode === 'en')
			returnText = confirmMessage.error[0];
		else
			returnText = confirmMessage.error[1];

		PostData('auth/signin', this.state).then ((result) => {
			if (result == "NE OK"){
				this.setState({ registrationFalse : returnText});
			} else {
				localStorage.setItem('accessToken', result);
				history.push(`/Library`);
			}
		})
	}

	render() {
		return (
			<Row>
				<form onSubmit={this.handleSubmit} className="signInError-title" >
					<h5 className="signIn-title"><Translate id="signin">Sign in</Translate></h5>
					<Input label={<Translate id="login">Login</Translate>} s={12} name="login"required onChange={this.getValueFromForm} />
					<Input label={<Translate id="password">Password</Translate>} type="password" required name="password" s={12} onChange={this.getValueFromForm} />
					{	this.state.registrationFalse && ( <span className="alert alert-danger">{this.state.registrationFalse}</span>)	}
					{	this.state.registrationSuccess && ( <span className="alert alert-success">{this.state.registrationSuccess}</span>)	}
					<div className="col input-field s12 OAuth-position">
						<Button waves='light'><Translate id="signin_button">Sign in</Translate></Button>
					</div>
				</form>
			</Row>
		);
  }
}
export default withLocalize(Signin);
