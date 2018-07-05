import React, { Component } from 'react';
import { CardPanel, Col, Row } from 'react-materialize';

import Navbar from '../Navbar/Navbar';
import Foot from '../Footer/Footer';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import PasswordRecovery from '../PasswordRecovery/PasswordRecovery';

import './Auth.css';
import '../Global.css';

class Auth extends Component  {

  render() {
    return (
      <div className="auth-flex backgroundAuth">
				<Navbar />
				<div className="container">
					<Row className="CardPanel-right">
						<Col s={12} m={8} l={6} xl={4}>
							<CardPanel className="teal card-background">
								<Signin />
								<Signup />
								<PasswordRecovery />
							</CardPanel>
						</Col>
					</Row>
				</div>
				<Foot />
			</div>
    );
  }
}
export default Auth;
