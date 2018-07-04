import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';

import OAuth from '../OAuth/OAuth';
import './Signin.css';

class Signin extends Component  {

  render() {
    return (
      <Row>
          <h5>Sign in</h5>
          <Input label="Login" s={12} />
          <Input type="password" label="Password" s={12} />
          <div className="col input-field s12 OAuth-position">
            <Button waves='light'>Sign in</Button>
            <OAuth />
          </div>
      </Row>
    );
  }
}
export default Signin;
