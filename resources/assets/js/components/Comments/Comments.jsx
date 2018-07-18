import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

/*localization*/
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations from '../translations/global.json';
/*localization end*/

import './Comments.css';
import { PostData } from '../../functions/PostData';
import { Card, Col, Chip, Row, Input, Button } from 'react-materialize';

class Comments extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			inputText: '',
			userId: ''
		}
		this.getValueFromForm = this.getValueFromForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount () {
		let token =localStorage.getItem('accessToken');
		let decoded = jwtDecode(token);
		this.setState({ userId: decoded.uid });
	}

	getValueFromForm(event) {
		this.setState({ [event.target.name] : event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	render() {
		return (
			<Col m={7} s={12}>
				<Card title='Comments'>
					<form onSubmit={this.handleSubmit}>
						<Input type="textarea" name="inputText" label="Left comment" s={12} onChange={this.getValueFromForm} />
						<Button waves='light' className="comment-button-float">Send comment</Button>
					</form>
					<ul className="collection">
						<li className="collection-item avatar collection-item">
							<img src="http://localhost:8100/./profile_pictures/1531896702.png" alt="" className="circle" />
								<span className="title">Vladimir Gryshchenko</span>
								<p className="comments-text-style">
									sdjgfsdhjfgsdjfhgsdjhfgsdhmfsdjfgsdjfgsdj,fsdfj,sdfjsdgfsdjfgbdshmfgsdjhfvdsjhcbsdjhgvcsdjhcbsdjhcdsvcjdhsvcdhjscdsjhcdsvhcdshgcjhsdcdhsjgcsdsdkhfsdkjfsdmfgsdhnfgdshjnfsdjfbgvdsfnvdsjc,hdnsvcdsvcjdhsnvcdnsvcdnsvcdsncvdsjhv
								</p>
						</li>
					</ul>
					</Card>
				</Col>
			);
		}
}
export default withLocalize(Comments);
