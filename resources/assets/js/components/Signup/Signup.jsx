import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';

import { Link } from 'react-router-dom';

import './Signup.css';

class Signup extends Component  {

  render() {
    return (
      <Row>
          <h5>Sign up</h5>
          <Input s={6} label="First Name" />
          <Input s={6} label="Last Name" />
          <Input name="username" label="Username" s={6} />
          <Input type="email" label="Email" s={6} />
          <Input type="password" label="Password" s={12} />
          <div className="col input-field s12">
            <Button waves='light'>Sign up</Button>
			<Button waves='light'><Link to="/library">Test Link to library</Link></Button>
          </div>
      </Row>
    );
  }
}
export default Signup;
