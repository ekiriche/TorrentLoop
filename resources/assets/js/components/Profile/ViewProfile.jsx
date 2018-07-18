import React, { Component } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
/*localization*/
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
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
    let jwt = localStorage.getItem('accessToken');
    let user = jwtDecode(jwt);
    axios.post('http://localhost:8100/auth/token-update', {'id' : user.uid, 'jwt' : jwt}).then (result => {
      if (result.data == 'expired')
        localStorage.removeItem('accessToken');
    });
	}

	componentWillMount() {
		axios.post('http://localhost:8100/profile/get-user-info', {'id': this.state.id}).then(result => {
			this.setState({
				'firstname': result.data.firstname,
				'lastname': result.data.lastname,
				'picture': result.data.photo,
				'info': result.data.info
			});
		});

		let jwt = localStorage.getItem('accessToken');
		PostData('profile/get-history', {
			'jwt': jwt
		}).then ((result) => {
			this.setState(
				{
					'links': result
				},
				() => {
					console.log(this.state.links);
				}
			)
		});
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
								<h6>Bio</h6>
								<p>{this.state.info}</p>
							</Card>
							<Card horizontal title="Recently viewed">
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
