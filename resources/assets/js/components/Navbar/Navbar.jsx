import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper container">
          <a href="#" className="brand-logo">Hypertube<i className="fas fa-film  fa-2x" aria-hidden="true"></i></a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
