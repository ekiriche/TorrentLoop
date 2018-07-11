import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter, NavLink } from 'react-router-dom';
import SideNav, {MenuIcon} from 'react-simple-sidenav';


import LanguageToggle from '../Library/LanguageToggle';
import './Navbar.css';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showNav: false,
			jwtToken: localStorage.getItem('accessToken')
		};
	}
	render() {
		return (
			<div>
				<nav>
					<div className="nav-wrapper container nav-wrapper-flex">
						<a href="#" className="brand-logo">Hypertube<i className="fas fa-film  fa-2x" aria-hidden="true"></i></a>
						<div className="languageMenuIcon-flex">
							<LanguageToggle />
							{(this.state.jwtToken) ? <MenuIcon onClick={() => this.setState({showNav: true})}/> : <p className="nav-display-none"></p>}
						</div>
					</div>
				</nav>
				{(this.state.jwtToken) ?
					<SideNav
						openFromRight={true}
						showNav={this.state.showNav}
						onHideNav={()=>this.setState({showNav: false})}
						title='Navigation'
						titleStyle={{backgroundColor: '#0E0B18', fontSize: '2.2rem', textAlign: 'center'}}
						itemStyle={{display: 'inlineGrid', width: '100%', textAlign: 'center', backgroundColor: '#0E0B18'}}
						itemHoverStyle={{backgroundColor: 'grey'}}
						items={[
							<NavLink to="/Profile" activeClassName="linkActive">Profile</NavLink>,
							<NavLink to="/Library" activeClassName="linkActive">Library</NavLink>,
							<NavLink to="/Stream" activeClassName="linkActive">Stream</NavLink>,
							<NavLink to="/" activeClassName="linkActive">Logout</NavLink>]} />
						: <p className="nav-display-none"></p>}
			</div>
		);
	}
}

export default Navbar;
