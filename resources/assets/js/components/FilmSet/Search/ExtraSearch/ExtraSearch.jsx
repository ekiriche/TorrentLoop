import React, { Component } from 'react';
import { Row, Input, Col } from 'react-materialize';
import { Link } from 'react-router-dom';

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
				<div className="extra-settings-title"><i className="material-icons">sort</i>Sort by: {this.state.sortBy}</div>
				<div className="radio extra">
					<div className="radio-extra-col">
						<label className="extra-container">
							<p className="label-extra">Rating</p>
							<input type="radio" name="extraGroup" value='rating' onChange={this.handleSortBy}/>
							<span className="checkmark"></span>
						</label>
						<label className="extra-container">
							<p className="label-extra">Latest</p>
							<input type="radio" name="extraGroup" value='latest' onChange={this.handleSortBy}/>
							<span className="checkmark"></span>
						</label>
						<label className="extra-container">
							<p className="label-extra">Year</p>
							<input type="radio" name="extraGroup" value='year' onChange={this.handleSortBy}/>
							<span className="checkmark"></span>
						</label>
					</div>

					<div  className="radio-extra-col">
						<label className="extra-container">
							<p className="label-extra">Title</p>
							<input type="radio" name="extraGroup" value='title' onChange={this.handleSortBy}/>
							<span className="checkmark"></span>
						</label>

						<label className="extra-container">
							<p className="label-extra">Oldest</p>
							<input type="radio" name="extraGroup" value='oldest' onChange={this.handleSortBy}/>
							<span className="checkmark"></span>
						</label>
					</div>

				</div>
			</div>
		)
	}
}
export default ExtraSearch;
