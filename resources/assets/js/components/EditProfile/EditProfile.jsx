import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
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
    this.handleChange = this.handleChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handlePhotoChange = this.handlePhotoChange.bind(this);
		this.handleInfoChange = this.handleInfoChange.bind(this);
		this.handleOAuthPassword = this.handleOAuthPassword.bind(this);
	}

	componentWillMount() {
    let token =  localStorage.getItem('accessToken');
    let id = jwtDecode(token);
    axios.post('http://localhost:8100/profile/get-user-info', {'id' : id.uid}).then (result => {
			if (result.data.info == null)
				this.setState({ 'info' : '' });
			else
				this.setState({ 'info' : result.data.info });
      this.setState({
        'firstname' : result.data.firstname,
        'lastname' : result.data.lastname,
        'email' : result.data.email,
        'photo' : result.data.photo,
        'password' : result.data.password,
				'user_id' : id.uid
      });
      console.log(this.state);
    });
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
		console.log(oldpass.value);
    axios.post('http://localhost:8100/auth/update-pass', {'oldpass' : oldpass.value, 'newpass' : newpass.value, 'id' : this.state.user_id}).then (result => {
			console.log(result.data);
			if (result.data == 'Wrong password')
				this.setState({ oldpassword_error : "Wrong password" });
			else if (result.data != "OK")
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
		console.log(this.state.user_id);
		this.setState({ photo_change : true });
		let reader = new FileReader();
		//let new_photo = document.getElementById("new_photo");
		let photo = document.getElementById("photo");
		reader.readAsDataURL(selectorFiles[0]);
		reader.onloadend = function() {
			photo.setAttribute('src', reader.result);
			axios.post('http://localhost:8100/profile/set-picture', { 'img' : reader.result, 'id' : id.uid }).then (result => {
				console.log(result);
			})
		}
	}

	handleInfoChange(event)
	{
		event.preventDefault();
		let token =  localStorage.getItem('accessToken');
    let id = jwtDecode(token);
		this.setState({ info_change : '' });
		console.log(this.state);
		axios.post('http://localhost:8100/profile/set-info', {'id' : id.uid, 'firstname' : this.state.firstname, 'lastname' : this.state.lastname, 'email' : this.state.email, 'info' : this.state.info}).then (result => {
			console.log(result.data);
			if (result.data == "OK")
				this.setState({ info_change : 'changed' });
			else
			{
				this.setState({ info_change : 'not changed' });
				this.setState({ info_error : result.data[0] });
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
		axios.post('http://localhost:8100/profile/set-password', { 'id' : id.uid, 'password' : this.state.new_oauth_password }).then (result => {
			console.log(result.data);
			if (result.data == "OK")
				this.setState({ password_change_success : true });
			else {
				this.setState({ newpassword_error : "New password should have at least six symbols, including one capital letter and one digital" });
			}
		});
	}

	render() {

		return (
			<div className="movie-flex">
				<Navbar />
				<form onSubmit={this.handleInfoChange}>
				<h5>Account information</h5>
				<div className="row">
					 <div className="input-field col s6">
							<input type="text" name="firstname" id="first_name" value={ this.state.firstname } onChange={ this.handleChange }/>
							{ this.state.firstname ? ( <label className="active">First Name</label> ) : ( <label>First Name</label> )}
					 </div>
					 <div className="input-field col s6">
							<input type="text" name="lastname" id="last_name" value={ this.state.lastname } onChange={ this.handleChange }/>
							{ this.state.lastname ? ( <label className="active">Last Name</label> ) : ( <label>Last Name</label> )}
					 </div>
					 <div className="input-field col s12">
							<input type="text" name="email" id="email" value={ this.state.email } onChange={ this.handleChange }/>
							{ this.state.email ? ( <label className="active">Email</label> ) : ( <label>Email</label> )}
					 </div>
					 <div className="input-field col s12">
					 		<textarea name="info" id="info" className="materialize-textarea" value={ this.state.info } onChange={ this.handleChange }/>
							{ this.state.info ? ( <label className="active">Additional info</label> ) : ( <label>Additional info</label> )}
					 </div>
					 { this.state.info_change == "changed" && ( <div className="row"><span className="alert alert-success">Info changed!</span></div> ) }
					 { this.state.info_change == "not changed" && ( <div className="row"><span className="alert alert-danger">{this.state.info_error}</span></div> ) }
					 <Button waves='light'>Change information</Button>
				 </div>
			 </form>
			 <h5>Photo</h5>
			 <div className="row">
					<img src={this.state.photo} id="photo"/>
					<input id="input-file" accept=".png, .jpg, .jpeg" type="file" onChange={ (e) => this.handlePhotoChange(e.target.files)} id="new_photo" />
				</div>
				<h5>Password</h5>
					{ this.state.password != undefined ? (
						<form onSubmit={this.handlePasswordChange} className="password-change">
							<div className="row">
								<div className="input-field col s12">
									<label>Old password</label>
		          		<input type="password" s={12} id="oldpass" name="old_password" required onChange={this.handleChange}/>
								</div>
								<div className="input-field col s12">
									<label>New password</label>
									<input type="password" s={12} id="newpass" name="new_password" required onChange={this.handleChange}/>
								</div>
								{ this.state.oldpassword_error && ( <div className="row"><span className="alert alert-danger">{this.state.oldpassword_error}</span></div> ) }
								{ this.state.newpassword_error && ( <div className="row"><span className="alert alert-danger">{this.state.newpassword_error}</span></div> ) }
								{ this.state.password_change_success && ( <div className="row"><span className="alert alert-success">Password changed!</span></div> ) }
								<Button waves='light'>Change password</Button>
							</div>
						</form>
					) : (
						<form onSubmit={this.handleOAuthPassword} className="password-change">
							<div className="row">
								<div className="input-field col s12">
									<label>New password</label>
		            	<input type="password" s={12} id="new_oauth_password" name="new_oauth_password" required onChange={this.handleChange}/>
								</div>
								{ this.state.newpassword_error && ( <div className="row"><span className="alert alert-danger">{this.state.newpassword_error}</span></div> ) }
								{ this.state.password_change_success && ( <div className="row"><span className="alert alert-success">Password changed!</span></div> ) }
								<Button waves='light'>Change password</Button>
							</div>
						</form>
					)}
				<Foot />
			</div>
		);
	}
}
export default EditProfile;
