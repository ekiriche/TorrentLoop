import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';

import {checkString,checkValue,FormValueValidation} from './formValueCheck';

import { withLocalize, Translate } from 'react-localize-redux';

import { PostData } from '../../functions/PostData';
import { Link } from 'react-router-dom';

import { confirmMessage } from './confirmMessage';

import './Signup.css';

class Signup extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			login: '',
			password: '',
			firstnameError: '',
			lastnameError: '',
			emailError: '',
			loginError: '',
			passwordError: ''
		};
		this.formValueCheck = this.formValueCheck.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getValueFromForm = this.getValueFromForm.bind(this);
	}

	getValueFromForm(event) {
		const langCode = this.props.activeLanguage;

		this.formValueCheck(event, langCode.code);
		if (event.target.name === 'login') {
			this.setState({ [event.target.name] : event.target.value.toLowerCase() });
		}
		else
		this.setState({[event.target.name]: event.target.value});
	}


	formValueCheck(event, langCode) {

		let validateMessage = FormValueValidation(event, langCode);

		if (validateMessage !== undefined && event.target.name === 'firstname') {
			this.setState({firstnameError: validateMessage });
		} else if (validateMessage === undefined && event.target.name === 'firstname')
		this.setState({firstnameError: '' });
		if (validateMessage !== undefined && event.target.name === 'lastname') {
			this.setState({lastnameError: validateMessage });
		} else if (validateMessage === undefined && event.target.name === 'lastname')
		this.setState({lastnameError: '' });
		if ( validateMessage !== undefined && event.target.name === 'email') {
			this.setState({emailError: validateMessage });
		} else if (validateMessage === undefined && event.target.name === 'email')
		this.setState({emailError: '' });
		if (validateMessage !== undefined && event.target.name === 'login') {
			this.setState({loginError: validateMessage });
		} else if (validateMessage === undefined && event.target.name === 'login')
		this.setState({loginError: '' });
		if (validateMessage !== undefined &&event.target.name === 'password') {
			this.setState({passwordError: validateMessage });
		} else if (validateMessage === undefined &&event.target.name === 'password')
		this.setState({passwordError: '' });
	}



	handleSubmit(event) {
		event.preventDefault();
		const langCode = this.props.activeLanguage.code;
		let returnText;

		if (langCode === 'en')
			returnText = confirmMessage.en;
		else
			returnText = confirmMessage.ua;

		this.setState({ registrationSuccess : '', registrationFalse : '' }); /*clear old message*/
		PostData('auth/signup', this.state).then ((result) => {
			if (result.email)
				this.setState({ registrationFalse : returnText[3] });
			else if (result.login)
				this.setState({ registrationFalse : returnText[2] });
			if (result === 'OK'){
				this.setState({ registrationSuccess : returnText[1],
								registrationFalse : ''
				 });
			}
		})
	}

	render() {
		return (
			<Row>
				<form onSubmit={this.handleSubmit} className="signUp-text">
					<h5 className="signUp-title"><Translate id="signup">Sign up</Translate></h5>
					<Input label={<Translate id="firstname">First name</Translate>} s={6} name="firstname" required  onChange={this.getValueFromForm} />
					<Input label={<Translate id="lastname">Last name</Translate>} s={6} name="lastname" required  onChange={this.getValueFromForm} />
					<Input label={<Translate id="login">Login</Translate>} name="login" s={6} required  onChange={this.getValueFromForm} />
					<Input label="Email" type="email" name="email" s={6} required  onChange={this.getValueFromForm} />
					<Input label={<Translate id="password">Password</Translate>} type="password" name="password" s={12} required  onChange={this.getValueFromForm} />
					{	this.state.firstnameError && ( <li className="invalidInput">{this.state.firstnameError}</li>) }
					{	this.state.lastnameError  && ( <li className="invalidInput">{this.state.lastnameError}</li>)  }
					{	this.state.loginError     && ( <li className="invalidInput">{this.state.loginError}</li>)     }
					{	this.state.emailError     && ( <li className="invalidInput">{this.state.emailError}</li>)     }
					{	this.state.passwordError  && ( <li className="invalidInput">{this.state.passwordError}</li>)  }
					{	this.state.registrationFalse && ( <span className="alert alert-danger">{this.state.registrationFalse}</span>)	}
					{	this.state.registrationSuccess && ( <span className="alert alert-success">{this.state.registrationSuccess}</span>)	}
					<div className="col input-field s12">
						<Button waves='light'><Translate id="signup">Sign up</Translate></Button>
					</div>
				</form>
			</Row>
		);
	}
}
export default withLocalize(Signup);
