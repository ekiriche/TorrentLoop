import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import Collapsible from 'react-collapsible';
import { withLocalize, Translate } from 'react-localize-redux';
import { PostData } from '../../functions/PostData';

import { confirmMessage } from './confirmMessage';
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
		let returnText;
		const langCode = this.props.activeLanguage.code;

		if (langCode === 'en')
			returnText = confirmMessage.en;
		else
			returnText = confirmMessage.ua;

		PostData('auth/reset-pass', this.state).then ((result) => {
			if (result === 'OK'){
				this.setState({ registrationSuccess : returnText[2],
								registrationFalse : ''
				 });
			} else {
				this.setState({ registrationFalse : returnText[0] });
			}
		})
	}

	render() {
		return (
			<Row>
				<Collapsible trigger={<Translate id="forgotpassword">Forgot password ?</Translate>}>
					<form onSubmit={this.handleSubmit} className="forgotPassword-text" >
						<Input type="email" name="email" required label="Email" s={12} onChange={this.getValueFromForm} />
						{	this.state.registrationFalse && ( <span className="alert alert-danger">{this.state.registrationFalse}</span>)	}
						{	this.state.registrationSuccess && ( <span className="alert alert-success">{this.state.registrationSuccess}</span>)	}
						<div className="col input-field s12">
							<Button waves='light'><Translate id="forgotpasswordButton">Send me mail</Translate></Button>
						</div>
					</form>
				</Collapsible>
			</Row>
		);
	}
}
export default withLocalize(PasswordRecovery);
