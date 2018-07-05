import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import Collapsible from 'react-collapsible';

import './PasswordRecovery.css';

class PasswordRecovery extends Component  {

  render() {
    return (
      <Row>
        <Collapsible trigger="Forgot password">
          <Input type="email" label="Email" s={12} />
          <div className="col input-field s12">
            <Button waves='light'>Send me new password</Button>
          </div>
        </Collapsible>
      </Row>
    );
  }
}
export default PasswordRecovery;
