import React, { Component } from 'react';
import { Row, Input, Col } from 'react-materialize';
import { Link } from 'react-router-dom';

import { Route, HashRouter } from 'react-router-dom';
import Nouislider from 'react-nouislider';

import './GenreSearch.css';

class GenreSearch extends Component  {

	constructor(props) {
		super(props);

		this.handleGenreValue = this.handleGenreValue.bind(this);

		this.state = {
			genreValue: 'all'
		}
	}

	handleGenreValue(event) {
		this.setState({
			genreValue: event.target.value,
		});
		this.props.genreToFind(event.target.value);
	}


	render() {
		return (
			<div>
				<div className="genre-settings-title"><i className="material-icons">local_movies</i>Genre: {this.state.genreValue}</div>
				<div className="radio genre">
					<div className="radio-genre-col">
						<label className="genre-container">
							<p className="label-genre">All</p>
							<input type="radio" name="genreGroup" value='all' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Adventure</p>
							<input type="radio" name="genreGroup" value='adventure' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Biography</p>
							<input type="radio" name="genreGroup" value='biography' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Crime</p>
							<input type="radio" name="genreGroup" value='crime' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Drama</p>
							<input type="radio" name="genreGroup" value='drama' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Fantasy</p>
							<input type="radio" name="genreGroup" value='fantasy' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Horror</p>
							<input type="radio" name="genreGroup" value='horror' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Mystery</p>
							<input type="radio" name="genreGroup" value='mystery' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">SciFi</p>
							<input type="radio" name="genreGroup" value='sci-fi' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Sport</p>
							<input type="radio" name="genreGroup" value='sport' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Thriller</p>
							<input type="radio" name="genreGroup" value='thriller' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Western</p>
							<input type="radio" name="genreGroup" value='western' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
					</div>

					<div className="radio-genre-col">
						<label className="genre-container">
							<p className="label-genre">Action</p>
							<input type="radio" name="genreGroup" value='action' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Animation</p>
							<input type="radio" name="genreGroup" value='animation' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Comedy</p>
							<input type="radio" name="genreGroup" value='comedy' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Documentary</p>
							<input type="radio" name="genreGroup" value='documentary' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Family</p>
							<input type="radio" name="genreGroup" value='family' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">History</p>
							<input type="radio" name="genreGroup" value='history' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Music</p>
							<input type="radio" name="genreGroup" value='music' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Musical</p>
							<input type="radio" name="genreGroup" value='musical' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Romance</p>
							<input type="radio" name="genreGroup" value='romance' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Short</p>
							<input type="radio" name="genreGroup" value='short' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">Superhero</p>
							<input type="radio" name="genreGroup" value='superhero' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre">War</p>
							<input type="radio" name="genreGroup" value='thriller' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
			</div>
		)
	}
}
export default GenreSearch;
