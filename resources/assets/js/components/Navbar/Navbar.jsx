import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter, NavLink } from 'react-router-dom';
import SideNav, {MenuIcon} from 'react-simple-sidenav';
import jwtDecode from 'jwt-decode';
import { Row, Input, Button } from 'react-materialize';
import LanguageToggle from '../../functions/LanguageToggle';
import './Navbar.css';

/*localization*/
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations from '../translations/global.json';
import ToggleButton from 'react-toggle-button';
/*localization end*/

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showNav: false,
			jwtToken: localStorage.getItem('accessToken'),
			profilePath : ""
		};
		this.props.initialize({
			languages: [
				{ name: "EN", code: "en" },
				{ name: "UA", code: "ua" }
			],
			translation: globalTranslations,
			options: { renderToStaticMarkup }
		});
	}

	componentDidUpdate(prevProps) {
		const prevLangCode = prevProps.activeLanguage && prevProps.activeLanguage.code;
		const curLangCode = this.props.activeLanguage && this.props.activeLanguage.code;
		const hasLanguageChanged = prevLangCode !== curLangCode;
	}

	componentWillMount()
	{
		let jwt = localStorage.getItem('accessToken');
		if (jwt != null)
		{
			let id = jwtDecode(jwt);
			this.setState({ profilePath : "/Profile/" + id.uid });
		}
	}

	logout()
	{
		window.location.href = "http://localhost:8100/#/"
		localStorage.removeItem('accessToken');
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
						title={<Translate id="nav-title">Navigation</Translate>}
						titleStyle={{backgroundColor: '#0E0B18', fontSize: '2.2rem', textAlign: 'center'}}
						itemStyle={{display: 'inlineGrid', width: '100%', textAlign: 'center', backgroundColor: '#0E0B18'}}
						itemHoverStyle={{backgroundColor: 'grey'}}
						items={[
							<NavLink to={this.state.profilePath} activeClassName="linkActive"><Translate id="profile">Profile</Translate></NavLink>,
							<NavLink to="/Library" activeClassName="linkActive"><Translate id="library">Library</Translate></NavLink>,
							<NavLink to="/settings" activeClassName="linkActive"><Translate id="settings">Settings</Translate></NavLink>,
							<NavLink to="/" activeClassName="linkActive" onClick={this.logout}><Translate id="logout">Logout</Translate></NavLink>]} />
						: <p className="nav-display-none"></p>}
			</div>
		);
	}
}

export default withLocalize(Navbar);
