import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
/*localization*/
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations from '../translations/global.json';
import ToggleButton from 'react-toggle-button';
/*localization end*/

import Navbar from '../Navbar/Navbar';
import Foot from '../Footer/Footer';

import './Movie.css';

class Movie extends Component  {
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
			<div className="movie-flex">
				<Navbar />
				<Foot />
			</div>
		);
	}
}
export default withLocalize(Movie);
