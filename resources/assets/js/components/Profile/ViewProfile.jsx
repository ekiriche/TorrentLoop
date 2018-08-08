import React, { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
/*localization*/
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations from '../translations/global.json';
import ToggleButton from 'react-toggle-button';
/*localization end*/

import './Profile.css';
import {Card, CardTitle, Col, Chip, Row} from 'react-materialize';
import Navbar from '../Navbar/Navbar';
import FilmLink from '../FilmLink/FilmLink';
import Foot from '../Footer/Footer';

import { PostData } from '../../functions/PostData';

class ViewProfile extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			'id': this.props.match.params.id,
			'links': []
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


	componentWillMount() {
		let jwt = localStorage.getItem('accessToken');
    let user = jwtDecode(jwt);
		PostData('auth/token-update', {'id' : user.uid, 'jwt' : jwt}).then ((result) => {

	//		if (result == 'expired')
    //    localStorage.removeItem('accessToken');
		})
		PostData('profile/get-user-info', {'id': this.state.id}).then ((result) => {
			this.setState({
				'firstname': result.firstname,
				'lastname': result.lastname,
				'picture': result.photo,
				'info': result.info
			});
		})/*
    axios.post('http://localhost:8100/auth/token-update', {'id' : user.uid, 'jwt' : jwt}).then (result => {
      if (result.data == 'expired')
        localStorage.removeItem('accessToken');
    });
		axios.post('http://localhost:8100/profile/get-user-info', {'id': this.state.id}).then(result => {
			this.setState({
				'firstname': result.data.firstname,
				'lastname': result.data.lastname,
				'picture': result.data.photo,
				'info': result.data.info
			});
		});*/
	/*	PostData('profile/get-history', {
			'jwt': jwt
		}).then ((result) => {
			console.log(result);
			this.setState(
				{
					'links': result
				},
				() => {

				}
			)
		});*/
		axios.post('http://localhost:8100/profile/get-history', {'user_id' : user.uid}).then ((result) => {
			this.setState({'links': result.data});
		})
	}

	render() {

		if (!this.state.picture) {
			return (
				<div className="progress">
					<div className="indeterminate"></div>
				</div>
			)
		}

		const links = this.state.links;

		const allFilms = links.map(
			(link, i) =>
			<FilmLink
				key={i}
				delay={i % 48}
				cover={link.medium_cover_image}
				name={link.title_english}
				year={link.year}
				rating={link.rating}
				movieId={link.movie_id}
				/>
		)
		return (
			<div className="movie-flex">
				<Navbar />
				<div className="container">
					<Row>
						<Col m={12} s={12}>
							<Card horizontal header={<CardTitle image={this.state.picture}></CardTitle>}>
								<h4>{this.state.firstname} {this.state.lastname}</h4>
								<h6><Translate id="bio">Bio</Translate></h6>
								<p>{this.state.info}</p>
							</Card>
							<Card horizontal >
								<h5><Translate id="recently_viewed">Recently viewed</Translate></h5>
								<div className="view-history">{allFilms}</div>
							</Card>
						</Col>
					</Row>
				</div>
				<Foot />
			</div>
		);
	}
}

export default withLocalize(ViewProfile);
