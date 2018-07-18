import React, { Component } from 'react';
import { Row, Input, Col } from 'react-materialize';
import { Link } from 'react-router-dom';
import { withLocalize, Translate } from 'react-localize-redux';

import { Route, HashRouter } from 'react-router-dom';
import Nouislider from 'react-nouislider';

import './RatingSearch.css';

class RatingSearch extends Component  {

	constructor(props) {
		super(props);

		this.handleRatingValue = this.handleRatingValue.bind(this);

		this.state = {
			ratingValue: 0
		}
	}

	handleRatingValue(event) {
		this.setState({
				ratingValue: event.target.value,
		});
		this.props.minRating(event.target.value);
	}

	render() {
		return (
			<div>
				<div className="rating-settings-title"><i className="material-icons">grade</i><Translate id="search-rating">Rating</Translate>: {this.state.ratingValue + "+"}</div>
				<div className="radio rating">
					<label className="rating-container">
						<p className="label-rating"><Translate id="search-all">All</Translate></p>
						<input type="radio" name="ratingGroup" value='0' onChange={this.handleRatingValue}/>
						<span className="checkmark"></span>
					</label>
					<label className="rating-container">
						<p className="label-rating">1+</p>
						<input type="radio" name="ratingGroup" value='1' onChange={this.handleRatingValue}/>
						<span className="checkmark"></span>
					</label>
					<label className="rating-container">
						<p className="label-rating">2+</p>
						<input type="radio" name="ratingGroup" value='2' onChange={this.handleRatingValue}/>
						<span className="checkmark"></span>
					</label>
					<label className="rating-container">
						<p className="label-rating">3+</p>
						<input type="radio" name="ratingGroup" value='3' onChange={this.handleRatingValue}/>
						<span className="checkmark"></span>
					</label>
					<label className="rating-container">
						<p className="label-rating">4+</p>
						<input type="radio" name="ratingGroup" value='4' onChange={this.handleRatingValue}/>
						<span className="checkmark"></span>
					</label>
					<label className="rating-container">
						<p className="label-rating">5+</p>
						<input type="radio" name="ratingGroup" value='5' onChange={this.handleRatingValue}/>
						<span className="checkmark"></span>
					</label>
					<label className="rating-container">
						<p className="label-rating">6+</p>
						<input type="radio" name="ratingGroup" value='6' onChange={this.handleRatingValue}/>
						<span className="checkmark"></span>
					</label>
					<label className="rating-container">
						<p className="label-rating">7+</p>
						<input type="radio" name="ratingGroup" value='7' onChange={this.handleRatingValue}/>
						<span className="checkmark"></span>
					</label>
					<label className="rating-container">
						<p className="label-rating">8+</p>
						<input type="radio" name="ratingGroup" value='8' onChange={this.handleRatingValue}/>
						<span className="checkmark"></span>
					</label>
					<label className="rating-container">
						<p className="label-rating">9+</p>
						<input type="radio" name="ratingGroup" value='9' onChange={this.handleRatingValue}/>
						<span className="checkmark"></span>
					</label>
				</div>
			</div>
		)
	}
}
export default withLocalize(RatingSearch);


// <Input name='group2' type='radio' value='0' label='All' onChange={this.handleratingValue} />
// <Input name='group2' type='radio' value='1' label='1+' onChange={this.handleratingValue} />
// <Input name='group2' type='radio' value='2' label='2+' onChange={this.handleratingValue} />
// <Input name='group2' type='radio' value='3' label='3+' onChange={this.handleratingValue} />
// <Input name='group2' type='radio' value='4' label='4+' onChange={this.handleratingValue} />
// <Input name='group2' type='radio' value='5' label='5+' onChange={this.handleratingValue} />
// <Input name='group2' type='radio' value='6' label='6+' onChange={this.handleratingValue} />
// <Input name='group2' type='radio' value='7' label='7+' onChange={this.handleratingValue} />
// <Input name='group2' type='radio' value='8' label='8+' onChange={this.handleratingValue} />
// <Input name='group2' type='radio' value='9' label='9+' onChange={this.handleratingValue} />
