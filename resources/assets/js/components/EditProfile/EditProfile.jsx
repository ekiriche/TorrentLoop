import React, { Component } from 'react';
import { Row, Input, Button, CardPanel } from 'react-materialize';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { PostData } from '../../functions/PostData';
/*localization*/
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations from '../translations/global.json';
import ToggleButton from 'react-toggle-button';
/*localization end*/
import { Card, CardTitle , Col} from 'react-materialize';

import Navbar from '../Navbar/Navbar';
import Foot from '../Footer/Footer';

import './EditProfile.css';

class EditProfile extends Component  {
	constructor(props) {
		super(props);
    this.state = {
      'firstname' : '',
      'lastname' : '',
      'email' : '',
      'info' : '',
      'photo' : '',
      'password' : '',
      'old-password' : '',
			'oldpassword_error' : false,
			'photo_change' : false
    }

		this.props.initialize({
			languages: [
				{ name: "EN", code: "en" },
				{ name: "UA", code: "ua" }
			],
			translation: globalTranslations,
			options: { renderToStaticMarkup }
		});

    this.handleChange = this.handleChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handlePhotoChange = this.handlePhotoChange.bind(this);
		this.handleInfoChange = this.handleInfoChange.bind(this);
		this.handleOAuthPassword = this.handleOAuthPassword.bind(this);
	}

	componentWillMount() {
    let token =  localStorage.getItem('accessToken');
    let id = jwtDecode(token);
		PostData('auth/token-update', {'id' : id.uid, 'jwt' : token}).then (result => {
			if (result.data == 'expired')
				localStorage.removeItem('accessToken');
		});
    PostData('profile/get-user-info', {'id' : id.uid}).then (result => {

			if (result.info == null)
				this.setState({ 'info' : '' });
			else
				this.setState({ 'info' : result.info });
      this.setState({
        'firstname' : result.firstname,
        'lastname' : result.lastname,
        'email' : result.email,
        'photo' : result.photo,
        'password' : result.password,
				'user_id' : id.uid
      });

    });
	}

		componentDidUpdate(prevProps) {
			const prevLangCode = prevProps.activeLanguage && prevProps.activeLanguage.code;
			const curLangCode = this.props.activeLanguage && this.props.activeLanguage.code;
			const hasLanguageChanged = prevLangCode !== curLangCode;

		}

  handleChange(event)
  {
    this.setState({[event.target.name]: event.target.value});
  }

  handlePasswordChange(event)
  {
    event.preventDefault();
		let oldpass = document.getElementById("oldpass");
		let newpass = document.getElementById("newpass");
		this.setState({ oldpassword_error : false});
		this.setState({ newpassword_error : false});
		this.setState({ password_change_success : false });

    PostData('auth/update-pass', {'oldpass' : oldpass.value, 'newpass' : newpass.value, 'id' : this.state.user_id}).then (result => {
			if (result.data == 'Wrong password')
				this.setState({ oldpassword_error : "Wrong password" });
			else if (result!= "OK")
				this.setState({ newpassword_error : "New password should have at least six symbols, including one capital letter and one digital" });
			else
				this.setState({ password_change_success : true });
		})
  }

	handlePhotoChange(selectorFiles: FileList)
	{
		event.preventDefault();
		let token =  localStorage.getItem('accessToken');
    let id = jwtDecode(token);

		this.setState({ photo_change : true });
		let reader = new FileReader();
		//let new_photo = document.getElementById("new_photo");
		let photo = document.getElementById("photo");
		reader.readAsDataURL(selectorFiles[0]);
		reader.onloadend = function() {
			photo.setAttribute('src', reader.result);
			PostData('profile/set-picture', { 'img' : reader.result, 'id' : id.uid }).then (result => {

			})
		}
	}

	handleInfoChange(event)
	{
		event.preventDefault();
		let token =  localStorage.getItem('accessToken');
    let id = jwtDecode(token);
		this.setState({ info_change : '' });
		PostData('profile/set-info', {'id' : id.uid, 'firstname' : this.state.firstname, 'lastname' : this.state.lastname, 'email' : this.state.email, 'info' : this.state.info}).then (result => {
			if (result == "OK")
				this.setState({ info_change : 'changed' });
			else
			{
				this.setState({ info_change : 'not changed' });
				if (result.email)
					this.setState({ info_error : result.email })
				else if (result.firstname)
				{
					this.setState({ info_error : result.firstname[0] });
				}
				else if (result.lastname)
				{
					this.setState({ info_error : result.lastname[0] });
				}
				else if (result.info)
				{
					this.setState({ info_error : result.info[0] });
				}
			}
		})
	}

	handleOAuthPassword(event)
	{
		event.preventDefault();
		let token =  localStorage.getItem('accessToken');
    let id = jwtDecode(token);
		this.setState({ newpassword_error : false});
		this.setState({ password_change_success : false });
		PostData('profile/set-password', { 'id' : id.uid, 'password' : this.state.new_oauth_password }).then (result => {

			if (result == "OK")
				this.setState({ password_change_success : true });
			else {
				this.setState({ newpassword_error : "New password should have at least six symbols, including one capital letter and one digital" });
			}
		});
	}

	render() {
		return (
			<div className="profile-flex">
				<Navbar />
				<CardPanel className="black-text profile">
					<h5><Translate id="changePhotoHeader">Photo</Translate></h5>
					<div className="row photo">
						<label htmlFor="new_photo">
        			<img src={this.state.photo} id="photo"/>
    				</label>
						<input
							id="input-file"
							style={{display: 'none'}}
							accept=".png, .jpg, .jpeg"
							type="file"
							onChange={ (e) => this.handlePhotoChange(e.target.files)}
							id="new_photo" />
					</div>
					<form onSubmit={this.handleInfoChange}>
						<h5><Translate id="changeAccountInformationHeader">Account information</Translate></h5>
						<div className="row">
							<div className="input-field col s6">
								<input type="text" name="firstname" id="first_name" value={ this.state.firstname } onChange={ this.handleChange }/>
								{ this.state.firstname ? ( <label className="active"><Translate id="changeFirstnameLabor">First Name</Translate></label> ) : ( <label><Translate id="changeFirstnameLabor">First Name</Translate></label> )}
							</div>
							<div className="input-field col s6">
								<input type="text" name="lastname" id="last_name" value={ this.state.lastname } onChange={ this.handleChange }/>
								{ this.state.lastname ? ( <label className="active"><Translate id="changeLastnameLabor">Last Name</Translate></label> ) : ( <label><Translate id="changeLastnameLabor">Last Name</Translate></label> )}
							</div>
							<div className="input-field col s12">
								<input type="text" name="email" id="email" value={ this.state.email } onChange={ this.handleChange }/>
								{ this.state.email ? ( <label className="active"><Translate id="changeEmailLaber">Email</Translate></label> ) : ( <label><Translate id="changeEmailLaber">Email</Translate></label> )}
							</div>
							<div className="input-field col s12">
								<textarea name="info" id="info" className="materialize-textarea" value={ this.state.info } onChange={ this.handleChange }/>
								{ this.state.info ? ( <label className="active"><Translate id="changeAdditionalInfoLaber">Additional info</Translate></label> ) : ( <label><Translate id="changeAdditionalInfoLaber">Additional info</Translate></label> )}
							</div>
							{ this.state.info_change == "changed" && ( <div className="row"><span className="alert alert-success">Info changed!</span></div> ) }
							{ this.state.info_change == "not changed" && ( <div className="row"><span className="alert alert-danger">{this.state.info_error}</span></div> ) }
							<Button waves='light'><Translate id="changeInformationButton">Change information</Translate></Button>
						</div>
					</form>
					<h5><Translate id="changePasswordHeader">Password</Translate></h5>
					{ this.state.password != undefined ? (
						<form onSubmit={this.handlePasswordChange} className="password-change">
							<div className="row">
								<div className="input-field col s12">
									<label><Translate id="changeOldPasswordLaber">Old password</Translate></label>
									<input type="password" s={12} id="oldpass" name="old_password" required onChange={this.handleChange}/>
								</div>
								<div className="input-field col s12">
									<label><Translate id="changeNewPasswordLaber">New password</Translate></label>
									<input type="password" s={12} id="newpass" name="new_password" required onChange={this.handleChange}/>
								</div>
								{ this.state.oldpassword_error && ( <div className="row"><span className="alert alert-danger">{this.state.oldpassword_error}</span></div> ) }
								{ this.state.newpassword_error && ( <div className="row"><span className="alert alert-danger">{this.state.newpassword_error}</span></div> ) }
								{ this.state.password_change_success && ( <div className="row"><span className="alert alert-success">Password changed!</span></div> ) }
								<Button waves='light'><Translate id="changePasswordButton">Change password</Translate></Button>
							</div>
						</form>
					) : (
						<form onSubmit={this.handleOAuthPassword} className="password-change">
							<div className="row">
								<div className="input-field col s12">
									<label><Translate id="changeNewPasswordLaber">New password</Translate></label>
									<input type="password" s={12} id="new_oauth_password" name="new_oauth_password" required onChange={this.handleChange}/>
								</div>
								{ this.state.newpassword_error && ( <div className="row"><span className="alert alert-danger">{this.state.newpassword_error}</span></div> ) }
								{ this.state.password_change_success && ( <div className="row"><span className="alert alert-success">Password changed!</span></div> ) }
								<Button waves='light'><Translate id="changePasswordButton">Change password</Translate></Button>
							</div>
						</form>
					)}
				</CardPanel>
				<Foot />
			</div>
		);
	}
}
export default withLocalize(EditProfile);
