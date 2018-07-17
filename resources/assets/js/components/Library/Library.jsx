import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
/*localization*/
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations from '../translations/global.json';
import ToggleButton from 'react-toggle-button';
/*localization end*/

import './Library.css';

// import Search from '../Search/Search';
import Navbar from '../Navbar/Navbar';
import Foot from '../Footer/Footer';
import FilmSet from '../FilmSet/FilmSet';

class Library extends Component  {
	constructor(props) {
		super(props);

		this.state = {
			filmRequest: "list_movies.json?sort_by=rating&limit=" + 48 + "&page=" + 1,
		}

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
			<div className="library-flex">
				<Navbar />
				<div className="library">
					<FilmSet />
				</div>
				<Foot />
			</div>
		);
	}
}
export default withLocalize(Library);

//
