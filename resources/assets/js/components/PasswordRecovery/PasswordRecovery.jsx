import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import Collapsible from 'react-collapsible';
import { PostData } from './PostData';

import './PasswordRecovery.css';

class PasswordRecovery extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			email: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getValueFromForm = this.getValueFromForm.bind(this);
	}

	getValueFromForm(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		const confirmMessage = {
			error: ['Something wrong we couldn\'t send you a mail', 'We can\'t find your mail'],
			success: ['Check your mail, we send you instructions']
		}
		PostData('reset-pass', this.state).then ((result) => {
			console.log(result);
			if (result === 'OK'){
				this.setState({ registrationSuccess : confirmMessage.success[0],
								registrationFalse : ''
				 });
			} else {
				this.setState({ registrationFalse : confirmMessage.error[0],
								registrationFalse : ''
				 });
			}
		})
	}

	render() {
		return (
			<Row>
				<Collapsible trigger="Forgot password">
					<form onSubmit={this.handleSubmit} className="forgotPassword-text" >
						<Input type="email" name="email" required label="Email" s={12} onChange={this.getValueFromForm} />
						{	this.state.registrationFalse && ( <span className="alert alert-danger">{this.state.registrationFalse}</span>)	}
						{	this.state.registrationSuccess && ( <span className="alert alert-success">{this.state.registrationSuccess}</span>)	}
						<div className="col input-field s12">
							<Button waves='light'>Send me new password</Button>
						</div>
					</form>
				</Collapsible>
			</Row>
		);
	}
}
export default PasswordRecovery;
