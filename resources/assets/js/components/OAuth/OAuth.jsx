import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';

import './OAuth.css';

class OAuth extends Component  {

  render() {
    return (
      <div className="wrapper">
        <ul>
          <li className="facebook"><i className="fab fa-facebook-f fa-2x" aria-hidden="true"></i></li>
          <li className="twitter"><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></li>
          <li className="google"><i className="fab fa-google-plus-g fa-2x" aria-hidden="true"></i></li>
        </ul>
      </div>
    );
  }
}
export default OAuth;
