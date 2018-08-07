import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FortyTwoPost } from './FortyTwoPost.jsx';
import axios from 'axios';
import history from '../History/History';

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

				this.state = {access_token : result.access_token};

				var stringa = 'https://api.intra.42.fr/v2/me?access_token=' + result.access_token;
				axios.get(stringa).then(response => {

					axios.post('http://localhost:8100/auth/osignup', {email : response.data.email, firstname : response.data.first_name, lastname : response.data.last_name, img : response.data.image_url}).then(response => {

						localStorage.setItem('accessToken', response.data);
						history.push('/#/library');
					});
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
		if (event.name) {
			var fullName = event.name.split(' ');

			var firstname = fullName[0];
			var lastname = fullName[1];
			axios.post('http://localhost:8100/auth/osignup', {email : event.email, firstname : firstname, lastname : lastname, img : event.picture.data.url}).then(response => {

				localStorage.setItem('accessToken', response.data);
				history.push('/#/library');
			})
			.catch(() => {

			});
		}
	}

	registerViaGoogle(event)
	{

		axios.post('http://localhost:8100/auth/osignup', {email : event.profileObj.email, firstname : event.profileObj.givenName, lastname : event.profileObj.familyName, img : event.profileObj.imageUrl}).then(response => {

			localStorage.setItem('accessToken', response.data);
			history.push('/#/library');
		});
	}

	render() {
		return (
			<div className="row oauth-flex">
				<div className="wrapper">
					<ul>
						<li className="forty-two"><i className="fa fa-2x" aria-hidden="true"><a className="forty-two-active forty-two-color" href="https://api.intra.42.fr/oauth/authorize?client_id=424d0c7fac1ed02048e197dda88a5e1a8fb60bd8a4420659d6096f8fbb2a1c73&redirect_uri=http%3A%2F%2Flocalhost%3A8100&response_type=code&scope=public">42</a></i></li>
						<GoogleLogin
							clientId="895850780881-s18dg7en9bq0hr32an5t4bl164l43iih.apps.googleusercontent.com"
							buttonText=""
							onSuccess={this.registerViaGoogle}
							onFailure={this.responseGoogle}
							className="google fab fa-google-plus-g fa-2x"
							tag="a"
							/>
						<FacebookLogin
							appId="241030700020959"
							fields="name,email,picture"
							callback={this.registerViaFacebook}
							cssClass="facebook fa-2x"
							icon="fab fa-facebook-f"
							tag="a"
							textButton=""
							/>
					</ul>
				</div>
			</div>
		);
	}
}
export default OAuth;
