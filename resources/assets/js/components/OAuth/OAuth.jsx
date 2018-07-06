import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FortyTwoPost } from './FortyTwoPost.jsx';
import { FortyTwoGet } from './FortyTwoGet.jsx';


import './OAuth.css';

class OAuth extends Component  {

  constructor()
  {
    super();
    var path = window.location.href;
    var code = path.slice(path.indexOf('=') + 1);
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
        axios.get(stringa).then(response => console.log(response.data));
    })
    }
  }

  responseGoogle(event)
  {
    console.log(event);
  }

  render() {
    return (
      <div className="wrapper">
        <ul>
          <li className="facebook"><i className="fab fa-facebook-f fa-2x" aria-hidden="true"></i></li>
          <li className="twitter"><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></li>
          <li className="google"><i className="fab fa-google-plus-g fa-2x" aria-hidden="true"></i></li>
        </ul>
        <GoogleLogin
          clientId="895850780881-s18dg7en9bq0hr32an5t4bl164l43iih.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
        <FacebookLogin
          appId="241030700020959"
          fields="name,email,picture"
          callback={this.responseGoogle}
        />
        <a href="https://api.intra.42.fr/oauth/authorize?client_id=424d0c7fac1ed02048e197dda88a5e1a8fb60bd8a4420659d6096f8fbb2a1c73&redirect_uri=http%3A%2F%2Flocalhost%3A8100&response_type=code&scope=public">42 lul</a>
        <button name="lul" onClick={this.helpMe}/>
      </div>
    );
  }
}
export default OAuth;
