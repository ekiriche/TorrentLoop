import React, { Component } from 'react';
import { Row, Input, Col } from 'react-materialize';
import { Link } from 'react-router-dom';
import { withLocalize, Translate } from 'react-localize-redux';

import { Route, HashRouter } from 'react-router-dom';

import './ExtraSearch.css';

class ExtraSearch extends Component  {

	constructor(props) {
		super(props);

		this.handleSortBy = this.handleSortBy.bind(this);

		this.state = {
			sortBy: 'rating'
		}
	}

	handleSortBy(event) {
		this.setState({
			sortBy: event.target.value,
		});
		this.props.sortBy(event.target.value);
	}

	render() {
		return (
			<div className="extra-search">
				<div className="extra-settings-title"><i className="material-icons">sort</i><Translate id="search-sort">Sort</Translate></div>
				<div className="radio extra">
					<div className="radio-extra-col">
						<label className="extra-container">
							<p className="label-extra"><Translate id="search-rating">Rating</Translate></p>
							<input type="radio" name="extraGroup" value='rating' onChange={this.handleSortBy}/>
							<span className="checkmark"></span>
						</label>
						<label className="extra-container">
							<p className="label-extra"><Translate id="search-latest">Year</Translate></p>
							<input type="radio" name="extraGroup" value='year' onChange={this.handleSortBy}/>
							<span className="checkmark"></span>
						</label>
					</div>

					<div  className="radio-extra-col">
						<label className="extra-container">
							<p className="label-extra"><Translate id="search-title">Title</Translate></p>
							<input type="radio" name="extraGroup" value='title' onChange={this.handleSortBy}/>
							<span className="checkmark"></span>
						</label>
					</div>

				</div>
			</div>
		)
	}
}
export default withLocalize(ExtraSearch);
