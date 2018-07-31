import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Recaptcha from 'react-recaptcha';

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
			comment_data: '',
			recaptchaLoaded: false,
			userVerifyRecaptcha: false
		}

		this.getValueFromForm = this.getValueFromForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setLike = this.setLike.bind(this);
		this.createRatingArray = this.createRatingArray.bind(this);
		this.createComments = this.createComments.bind(this);
		this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
		this.userCanSendMassage = this.userCanSendMassage.bind(this);
	}

	createRatingArray(rating) {
		let arr = [];
		let span = '☆';

		for (let i = 0; i < rating; i++) {
			arr[i] = span;
		}
		return (arr);
	}

	createComments(result, uid) {
		let AddCurrentUserId = result.map((comment) => ({
			...comment,
			'current_user_id': uid, /*add current user to id to result obj*/
			'rating_array': this.createRatingArray(comment.avgRating) /*add rating array to id to result obj*/
		}));
		const commentsList = AddCurrentUserId.map((comment, i) => {
			if (comment.current_user_id != comment.user_id) {
				return (
					<ul key={i} className="collection">
						<li className="collection-item avatar collection-item">
							<img src={comment.photo} alt="" className="circle" />
							{(comment.avgRating > 0) ? <span className="comment-rating-position" >{comment.avgRating}</span> : null }
							<span className="title">{comment.firstname} {comment.lastname}</span>
							<p className="comments-text-style">
								{comment.content}
							</p>
							<span className="secondary-content">{comment.created_at}</span>
							{(comment.current_user_id != comment.user_id && comment.currentUserRating == undefined) ?
								<div className="rating comment-like-positon">
									<span onClick={this.setLike} data-rating="5" data-comment-id={comment.id}>☆</span>
									<span onClick={this.setLike} data-rating="4" data-comment-id={comment.id}>☆</span>
									<span onClick={this.setLike} data-rating="3" data-comment-id={comment.id}>☆</span>
									<span onClick={this.setLike} data-rating="2" data-comment-id={comment.id}>☆</span>
									<span onClick={this.setLike} data-rating="1" data-comment-id={comment.id}>☆</span>
								</div>
								: <span className="comment-like-positon user-rating-color">{comment.rating_array}</span>
						}
					</li>
				</ul>
			)
		} else {
			return (
				<ul key={i} className="collection">
					<li className="collection-item avatar collection-item">
						<img src={comment.photo} alt="" className="circle" />
						{(comment.avgRating > 0) ? <span className="comment-rating-position" >{comment.avgRating}</span> : null }
						<span className="title">{comment.firstname} {comment.lastname}</span>
						<p className="comments-text-style">
							{comment.content}
						</p>
						<span className="secondary-content">{comment.created_at}</span>
					</li>
				</ul>
			)
		}
	})
	this.setState({comments_list: commentsList});
	}

	componentWillMount () {
		let token =localStorage.getItem('accessToken');
		let decoded = jwtDecode(token);
		this.setState({ user_id: decoded.uid });
		PostData('movie/get-comment', {'film_id': this.state.film_id, 'user_id': decoded.uid}).then ((result) => {
			this.setState({comment_data: result});
			this.createComments(result, decoded.uid );
		})
		//this.setState({comments: commentsList});
	}

getValueFromForm(event) {
	this.setState({ [event.target.name] : event.target.value});
}

setLike(event) {
	let rating = event.target.getAttribute('data-rating');
	let commentId = event.target.getAttribute('data-comment-id');
	PostData(	'movie/add-like', {
		'rating' : rating,
		'commentId' : commentId,
		'film_id' : this.state.film_id,
		'user_id' : this.state.user_id
	}).then ((result) => {
		this.createComments(result, this.state.user_id );
		this.setState({comment_data: result});
	})
}

handleSubmit(event) {

	event.preventDefault();
	if (this.state.userVerifyRecaptcha) {
		PostData('movie/add-comment', this.state).then ((result) => {
			this.createComments(result, this.state.user_id );
			this.setState({comment_data: result});
			/*
			if (result == 'ok') {
				this.setState({comment_add: true});
				this.state.comment_error ? this.setState({comment_error: ''}) : null;
			}
			else {
				this.setState({comment_error: result.content[0] });
				this.state.comment_add ? this.setState({comment_add: false }) : null;
			}*/
		})
	}
	this.setState({userVerifyRecaptcha: false})
}

recaptchaLoaded() {
	this.setState({recaptchaLoaded: true});
}
userCanSendMassage() {
	this.setState({userVerifyRecaptcha: true})
}

render() {
	let recaptchaInstance;

	const resetRecaptcha = () => {
		recaptchaInstance.reset();
	};
	return (
		<Col m={7} s={12}>
			<Card title='Comments'>
				<form onSubmit={this.handleSubmit} className="comment-form-flex">
					<Input type="textarea" name="content" label="Left comment" required s={12} onChange={this.getValueFromForm} />
					<div className="recaptcha-block">
						<Button waves='light' className="comment-button-float" onClick={resetRecaptcha}>Send comment</Button>
						<Recaptcha
							ref={e => recaptchaInstance = e}
							sitekey="6LctM2cUAAAAAF7nJiEOp_rvgyJ81_tPLfopHbiH"
							render="explicit"
							onloadCallback={this.recaptchaLoaded}
							verifyCallback={this.userCanSendMassage}
							elementID="g-recaptcha"
							/>
					</div>
				</form>
				{(this.state.comment_error) ? <span className="alert alert-danger">{this.state.comment_error}</span> : null}
				{(this.state.comment_add) ? <span className="alert alert-success">Comment added</span> : null}
				{(this.state.comments_list) ? this.state.comments_list : null }
			</Card>
		</Col>
	);
}
}
export default withLocalize(Comments);
