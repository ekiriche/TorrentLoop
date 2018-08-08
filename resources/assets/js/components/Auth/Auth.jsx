import React, { Component } from 'react';
import { CardPanel, Col, Row } from 'react-materialize';
/*localization*/
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations from '../translations/global.json';
import ToggleButton from 'react-toggle-button';

/*localization end*/
import Navbar from '../Navbar/Navbar';
import Foot from '../Footer/Footer';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import PasswordRecovery from '../PasswordRecovery/PasswordRecovery';
import OAuth from '../OAuth/OAuth';

import './Auth.css';
import '../Global.css';

class Auth extends Component  {
	constructor(props) {
		super(props);

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

	render() {
		return (
			<div className="auth-flex backgroundAuth">
				<Navbar />
				<div className="container">
					<Row className="CardPanel-right">
						<Col s={12} m={8} l={6} xl={4}>
							<CardPanel className="teal card-background">
								<Signin />
								<OAuth />
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
export default withLocalize(Auth);
