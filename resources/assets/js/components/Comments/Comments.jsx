import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Recaptcha from 'react-recaptcha';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/*localization*/
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations from '../translations/global.json';
import axios from 'axios';
/*localization end*/

import './Comments.css';
import { PostData } from '../../functions/PostData';
import { Card, Col, Chip, Row, Input, Button, Icon } from 'react-materialize';

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
		this.props.initialize({
			languages: [
				{ name: "EN", code: "en" },
				{ name: "UA", code: "ua" }
			],
			translation: globalTranslations,
			options: { renderToStaticMarkup }
		});

		this.getValueFromForm = this.getValueFromForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setLike = this.setLike.bind(this);
		this.createRatingArray = this.createRatingArray.bind(this);
		this.createComments = this.createComments.bind(this);
		this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
		this.userCanSendMassage = this.userCanSendMassage.bind(this);
		this.commentSort = this.commentSort.bind(this);
	}

	componentDidUpdate(prevProps) {
		const prevLangCode = prevProps.activeLanguage && prevProps.activeLanguage.code;
		const curLangCode = this.props.activeLanguage && this.props.activeLanguage.code;
		const hasLanguageChanged = prevLangCode !== curLangCode;
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
commentSort(event) {
	
	let whatSort, type, sorted;
	[ whatSort, type ] = [ event.target.id.split('-')[0], event.target.id.split('-')[1]];
	if (type === 'upward' && whatSort === 'date') {
		sorted = this.state.comment_data.sort(function(a, b) {
			return a.created_at > b.created_at;
		});
		this.createComments(sorted, this.state.user_id);
	} else if (type === 'downward' && whatSort === 'date') {
		sorted = this.state.comment_data.sort(function(a, b) {
			return a.created_at < b.created_at;
		});
		this.createComments(sorted, this.state.user_id);
	} else if (type === 'upward' && whatSort === 'rating') {
		sorted = this.state.comment_data.sort(function(a, b) {
			return a.avgRating > b.avgRating;
		});
		this.createComments(sorted, this.state.user_id);
	} else if (type === 'downward' && whatSort === 'rating') {
		sorted = this.state.comment_data.sort(function(a, b) {
			return a.avgRating < b.avgRating;
		});
		this.createComments(sorted, this.state.user_id);
	}
}

render() {
	let recaptchaInstance;

	const resetRecaptcha = () => {
		recaptchaInstance.reset();
	};
	return (
		<Col m={7} s={12}>
			<Card >
				<h5><Translate id="comments">Comments</Translate></h5>
				<form onSubmit={this.handleSubmit} className="comment-form-flex">
					<Input type="textarea" name="content" label={<Translate id="left-comment">Left comment</Translate>} required s={12} onChange={this.getValueFromForm} />
					<div className="recaptcha-block">
						<Button waves='light' className="comment-button-float" onClick={resetRecaptcha}><Translate id="send-comment">Send comment</Translate></Button>
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
				<div>
					<h5><Translate id="sort">Sort by</Translate></h5>
					<div className="comment-sort">
						<Button onClick={this.commentSort} className="comment-sort-button" id="date-upward" waves='light'><Translate id="date">Date</Translate><Icon left>arrow_upward</Icon></Button>
						<Button onClick={this.commentSort} className="comment-sort-button" id="date-downward" waves='light'><Translate id="date">Date</Translate><Icon left>arrow_downward</Icon></Button>
						<Button onClick={this.commentSort} className="comment-sort-button" id="rating-upward" waves='light'><Translate id="rating">Rating</Translate><Icon right>arrow_upward</Icon></Button>
						<Button onClick={this.commentSort} className="comment-sort-button" id="rating-downward" waves='light'><Translate id="rating">Rating</Translate><Icon right>arrow_downward</Icon></Button>
					</div>
				</div>
				{(this.state.comment_error) ? <span className="alert alert-danger">{this.state.comment_error}</span> : null}
				{(this.state.comment_add) ? <span className="alert alert-success"><Translate id="comment-added">Comment added</Translate></span> : null}

				<ReactCSSTransitionGroup
					transitionName="example"
				    transitionEnterTimeout={500}
				    transitionLeaveTimeout={300}>

					{(this.state.comments_list) ? this.state.comments_list : null }
				</ReactCSSTransitionGroup>
			</Card>
		</Col>
	);
}
}
export default withLocalize(Comments);
