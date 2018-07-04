import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './Footer.css';

class Foot extends Component {
	render() {
		return (
			<footer className="page-footer">
				<div className="footer-copyright">
				  <div className="container">
						© 2018 Creat by
					  <a className="grey-text text-lighten-4 right creat-margin" target="_blank" href="http://www.unit.ua">dpolosuh</a>
						<a className="grey-text text-lighten-4 right creat-margin" target="_blank" href="http://www.unit.ua">mmotov</a>
						<a className="grey-text text-lighten-4 right creat-margin" target="_blank" href="http://www.unit.ua">vgryshch</a>
						<a className="grey-text text-lighten-4 right creat-margin" target="_blank" href="http://www.unit.ua">ekiriche</a>
				  </div>
			  </div>
		  </footer>
		);
	}
}

export default Foot;
