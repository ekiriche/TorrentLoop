import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

/*localization*/
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations from '../translations/global.json';
import axios from 'axios';
/*localization end*/

import './Comments.css';
import { PostData } from '../../functions/PostData';
import { Card, Col, Chip, Row, Input, Button } from 'react-materialize';

class Comments extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			user_id: '',
			film_id: props.data.id,
			comment_add: false,
			comment_error: '',
			comments: ''
		}
		this.getValueFromForm = this.getValueFromForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setLike = this.setLike.bind(this);
	}

	componentWillMount () {
		let token =localStorage.getItem('accessToken');
		let decoded = jwtDecode(token);
		this.setState({ user_id: decoded.uid });
		PostData('movie/get-comment', this.state).then ((result) => {
			const commentsList = result.map((comment, i) =>
			<ul key={i} className="collection">
				<li className="collection-item avatar collection-item">
					<img src="http://localhost:8100/./profile_pictures/1531896702.png" alt="" className="circle" />
					<span className="title">Vladimir Gryshchenko</span>
					<p className="comments-text-style">
						{comment.content}
					</p>
					 <span className="secondary-content">{comment.created_at}</span>
					 <div className="like-position">
						 <a onClick={this.setLike} className="comment-like-positon"><i id="1" className="material-icons">grade</i></a>
						 <a onClick={this.setLike} className="comment-like-positon"><i id="2" className="material-icons">grade</i></a>
						 <a onClick={this.setLike} className="comment-like-positon"><i id="3" className="material-icons">grade</i></a>
						 <a onClick={this.setLike} className="comment-like-positon"><i id="4" className="material-icons">grade</i></a>
						 <a onClick={this.setLike} className="comment-like-positon"><i id="5" className="material-icons">grade</i></a>
					 </div>
				</li>
			</ul>
		)
		this.setState({comments: commentsList});
		})
	}
	setLike(event) {
		console.log(event.target);
	}
	getValueFromForm(event) {
		this.setState({ [event.target.name] : event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		PostData('movie/add-comment', this.state).then ((result) => {
			if (result == 'ok') {
				this.setState({comment_add: true});
				this.state.comment_error ? this.setState({comment_error: ''}) : null;
			}
			else {
				this.setState({comment_error: result.content[0] });
				this.state.comment_add ? this.setState({comment_add: false }) : null;
			}
		})
	}

	render() {
	return (
		<Col m={7} s={12}>
			<Card title='Comments'>
				<form onSubmit={this.handleSubmit} className="comment-form-flex">
					<Input type="textarea" name="content" label="Left comment" required s={12} onChange={this.getValueFromForm} />
					<Button waves='light' className="comment-button-float">Send comment</Button>
				</form>
				{(this.state.comment_error) ? <span className="alert alert-danger">{this.state.comment_error}</span> : null}
				{(this.state.comment_add) ? <span className="alert alert-success">Comment added</span> : null}
				{(this.state.comments) ? this.state.comments : null }
			</Card>
		</Col>
	);
}
}
export default withLocalize(Comments);
