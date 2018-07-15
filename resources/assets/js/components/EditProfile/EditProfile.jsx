import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
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
      'old-password' : ''
    }
    this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount() {
    let token =  localStorage.getItem('accessToken');
    let id = jwtDecode(token);
    axios.post('http://localhost:8100/profile/get-user-info', {'id' : id.uid}).then (result => {
      this.setState({
        'firstname' : result.data.firstname,
        'lastname' : result.data.lastname,
        'email' : result.data.email,
        'info' : result.data.info,
        'photo' : result.data.photo,
        'password' : result.data.password
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
    console.log('boi');
  }

	render() {

		return (
			<div className="movie-flex">
				<Navbar />
					<Row>
            <form onSubmit={this.handlePasswordChange} className="password-change">
              <Input type="password" s={12} name="old-password" required onChange={this.handleChange}/>
              <Input type="password" s={12} name="new-password" required onChange={this.handleChange}/>
              <Button waves='light'>Change password</Button>
            </form>
          </Row>
				<Foot />
			</div>
		);
	}
}
export default EditProfile;
