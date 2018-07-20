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
		this.createRatngArray = this.createRatngArray.bind(this);
	}

createRatngArray(rating) {
	let arr = [];
	let span = '☆';

	for (let i = 0; i < rating; i++) {
	  arr[i] = span;
	}
	return (arr);
}
	componentWillMount () {
		let token =localStorage.getItem('accessToken');
		let decoded = jwtDecode(token);
		this.setState({ user_id: decoded.uid });
		PostData('movie/get-comment', {'film_id': this.state.film_id, 'user_id': decoded.uid}).then ((result) => {
			let AddCurrentUserId = result.map((comment) => ({ /*add current user to id to result obj*/
				...comment,
				'current_user_id': decoded.uid,
				'rating_array': this.createRatngArray(comment.avgRating)
			}));
			console.log(AddCurrentUserId);
			const commentsList = AddCurrentUserId.map((comment, i) => {
				//console.log(i);
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
		this.setState({comments: commentsList});
	})
}

getValueFromForm(event) {
	this.setState({ [event.target.name] : event.target.value});
}

setLike(event) {
	let rating = event.target.getAttribute('data-rating');
	let commentId = event.target.getAttribute('data-comment-id');
	//console.log(rating);
	console.log(commentId);
	//console.log(this.state.film_id);
	//console.log(this.state.user_id);
	PostData(	'movie/add-like', {
		'rating' : rating,
		'commentId' : commentId,
		'film_id' : this.state.film_id,
		'user_id' : this.state.user_id
	}).then ((result) => {
		console.log(result);
	})
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
/*<span>Your rating is : {comment.currentUserRating.rating}</span>*/
/*
<div className="like-position">
<a onClick={this.setLike} className="comment-like-positon"><i id="1" className="material-icons">grade</i></a>
<a onClick={this.setLike} className="comment-like-positon"><i id="2" className="material-icons">grade</i></a>
<a onClick={this.setLike} className="comment-like-positon"><i id="3" className="material-icons">grade</i></a>
<a onClick={this.setLike} className="comment-like-positon"><i id="4" className="material-icons">grade</i></a>
<a onClick={this.setLike} className="comment-like-positon"><i id="5" className="material-icons">grade</i></a>
</div>

*/
