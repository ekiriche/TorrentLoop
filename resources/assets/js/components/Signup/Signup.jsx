import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import {checkString,checkValue,FormValueValidation} from './formValueCheck';
import { PostData } from './PostData';

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
		this.formValueCheck(event);
		if (event.target.name === 'login') {
			this.setState({ [event.target.name] : event.target.value.toLowerCase() });
		}
		else
		this.setState({[event.target.name]: event.target.value});
	}


	formValueCheck(event) {
		let validateMessage = FormValueValidation(event);

		if (validateMessage !== undefined && event.target.name === 'firstname') {
			this.setState({firstnameError: 'First name ' + validateMessage });
		} else if (validateMessage === undefined && event.target.name === 'firstname')
		this.setState({firstnameError: '' });
		if (validateMessage !== undefined && event.target.name === 'lastname') {
			this.setState({lastnameError: 'Last name ' + validateMessage });
		} else if (validateMessage === undefined && event.target.name === 'lastname')
		this.setState({lastnameError: '' });
		if ( validateMessage !== undefined && event.target.name === 'email') {
			this.setState({emailError: validateMessage });
		} else if (validateMessage === undefined && event.target.name === 'email')
		this.setState({emailError: '' });
		if (validateMessage !== undefined && event.target.name === 'login') {
			this.setState({loginError: 'Login ' + validateMessage });
		} else if (validateMessage === undefined && event.target.name === 'login')
		this.setState({loginError: '' });
		if (validateMessage !== undefined &&event.target.name === 'password') {
			this.setState({passwordError: validateMessage });
		} else if (validateMessage === undefined &&event.target.name === 'password')
		this.setState({passwordError: '' });
	}



	handleSubmit(event) {
		event.preventDefault();
		const confirmMessage = {
			error: ['Something wrong, we can\'t register you ',],
			success: ['Check your mail, we send you instructions']
		}
		this.setState({ registrationSuccess : '', registrationFalse : '' }); /*clear old message*/
		PostData('signup', this.state).then ((result) => {
			if (result.email)
				this.setState({ registrationFalse : result.email[0] });
			else if (result.login)
				this.setState({ registrationFalse : result.login[0] });
			if (result === 'OK'){
				this.setState({ registrationSuccess : confirmMessage.success[0],
								registrationFalse : ''
				 });
			}
		})
	}

	render() {
		return (
			<Row>
				<form onSubmit={this.handleSubmit} className="signUp-text">
					<h5 className="signUp-title">Sign up</h5>
					<Input s={6} name="firstname" label="First Name" required  onChange={this.getValueFromForm} />
					<Input s={6} name="lastname" label="Last Name" required  onChange={this.getValueFromForm} />
					<Input name="login" label="Login" s={6} required  onChange={this.getValueFromForm} />
					<Input type="email" name="email" label="Email" s={6} required  onChange={this.getValueFromForm} />
					<Input type="password" name="password" label="Password" s={12} required  onChange={this.getValueFromForm} />
					{	this.state.firstnameError && ( <li className="invalidInput">{this.state.firstnameError}</li>) }
					{	this.state.lastnameError  && ( <li className="invalidInput">{this.state.lastnameError}</li>)  }
					{	this.state.loginError     && ( <li className="invalidInput">{this.state.loginError}</li>)     }
					{	this.state.emailError     && ( <li className="invalidInput">{this.state.emailError}</li>)     }
					{	this.state.passwordError  && ( <li className="invalidInput">{this.state.passwordError}</li>)  }
					{	this.state.registrationFalse && ( <span className="alert alert-danger">{this.state.registrationFalse}</span>)	}
					{	this.state.registrationSuccess && ( <span className="alert alert-success">{this.state.registrationSuccess}</span>)	}
					<div className="col input-field s12">
						<Button waves='light'>Sign up</Button>
					</div>
				</form>
			</Row>
		);
	}
}
export default Signup;
