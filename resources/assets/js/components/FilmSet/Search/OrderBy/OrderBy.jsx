import React, { Component } from 'react';
import { Row, Input, Col } from 'react-materialize';
import { Link } from 'react-router-dom';
import { withLocalize, Translate } from 'react-localize-redux';

import { Route, HashRouter } from 'react-router-dom';

import './OrderBy.css';

class OrderBy extends Component  {

	constructor(props) {
		super(props);

		this.handleOrderBy = this.handleOrderBy.bind(this);

		this.state = {
			orderBy: 'desc'
		}
	}

	handleOrderBy(event) {
		this.setState({
			orderBy: event.target.value,
		});
		this.props.orderBy(event.target.value);
	}

	render() {
		return (
			<div className="order-search">
				<div className="order-settings-title"><Translate id="order-by">Order by</Translate></div>
				<div className="radio order">
					<div className="radio-order-col">
						<label className="order-container">
							<p className="label-order"><Translate id="search-asc">Ascending</Translate></p>
							<input type="radio" name="orderGroup" value='asc' onChange={this.handleOrderBy}/>
							<span className="checkmark"></span>
						</label>
						<label className="order-container">
							<p className="label-order"><Translate id="search-desc">Descending</Translate></p>
							<input type="radio" name="orderGroup" value='desc' onChange={this.handleOrderBy}/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
			</div>
		)
	}
}
export default withLocalize(OrderBy);
