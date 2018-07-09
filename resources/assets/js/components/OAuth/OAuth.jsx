import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FortyTwoPost } from './FortyTwoPost.jsx';
import axios from 'axios';

import './OAuth.css';

class OAuth extends Component  {

	constructor()
	{
		super();
		var path = window.location.href;
		var code = path.slice(path.indexOf('=') + 1);
		code = code.replace('#/', '');
		this.state ={
			grant_type: 'authorization_code',
			client_id: '424d0c7fac1ed02048e197dda88a5e1a8fb60bd8a4420659d6096f8fbb2a1c73',
			client_secret: 'f04df732742a66153a3e2f2ebbc63370f7e0f62c4a30d70f1052eced5c66810a',
			redirect_uri: 'http://localhost:8100',
			code: code
		};
		if (path.indexOf('code=') != -1)
		{
			FortyTwoPost('https://api.intra.42.fr/oauth/token', this.state).then ((result) => {
				console.log(result.access_token);
				this.state = {access_token : result.access_token};
				console.log(this.state);
				var stringa = 'https://api.intra.42.fr/v2/me?access_token=' + result.access_token;
				axios.get(stringa).then(response => {
					console.log(response.data);
				});
			});
		}
	}

	responseGoogle(event)
	{
		return ;
	}

	registerViaFacebook(event)
	{
		if (event.error)
			return ;
		console.log(event);
		var fullName = event.name.split(' ');
		var firstname = fullName[0];
		var lastname = fullName[1];
		axios.post('http://localhost:8100/auth/osignup', {email : event.email, firstname : firstname, lastname : lastname, img : event.picture.data.url}).then(response => {
			console.log(response.data);
		});
	}

	registerViaGoogle(event)
	{
		console.log(event.profileObj.imageUrl);
		axios.post('http://localhost:8100/auth/osignup', {email : event.profileObj.email, firstname : event.profileObj.givenName, lastname : event.profileObj.familyName, img : event.profileObj.imageUrl}).then(response => {
			console.log(response.data);
		});
	}

	render() {
		return (
			<div className="wrapper">
				<ul>
					<li className="facebook"><i className="fab fa-facebook-f fa-2x" aria-hidden="true"></i></li>
					<li className="twitter"><i className="fa  fa-2x" aria-hidden="true"><a href="https://api.intra.42.fr/oauth/authorize?client_id=424d0c7fac1ed02048e197dda88a5e1a8fb60bd8a4420659d6096f8fbb2a1c73&redirect_uri=http%3A%2F%2Flocalhost%3A8100&response_type=code&scope=public">42</a></i></li>
					<li className="google"><i className="fab fa-google-plus-g fa-2x" aria-hidden="true"></i></li>
				</ul>
				<GoogleLogin
					clientId="895850780881-s18dg7en9bq0hr32an5t4bl164l43iih.apps.googleusercontent.com"
					buttonText="Login"
					onSuccess={this.registerViaGoogle}
					onFailure={this.responseGoogle}
				/>
				<FacebookLogin
					appId="241030700020959"
					fields="name,email,picture"
					callback={this.registerViaFacebook}
				/>

			</div>
		);
	}
}
export default OAuth;
