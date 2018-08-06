import React, { Component } from 'react';
import { Row, Input, Col } from 'react-materialize';
import { Link } from 'react-router-dom';
import { withLocalize, Translate } from 'react-localize-redux';

import { Route, HashRouter } from 'react-router-dom';
import Nouislider from 'react-nouislider';

import './GenreSearch.css';

class GenreSearch extends Component  {

	constructor(props) {
		super(props);

		this.handleGenreValue = this.handleGenreValue.bind(this);

		this.state = {
			genreValue: 'all',
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
				<div className="genre-settings-title"><i className="material-icons">local_movies</i><Translate id="search-genre">Genre</Translate></div>
				<div className="radio genre">
					<div className="radio-genre-col">
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-all">All</Translate></p>
							<input type="radio" name="genreGroup" value='all' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-adventure">Adventure</Translate></p>
							<input type="radio" name="genreGroup" value='adventure' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-biography">Biography</Translate></p>
							<input type="radio" name="genreGroup" value='biography' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-crime">Crime</Translate></p>
							<input type="radio" name="genreGroup" value='crime' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-drama">Drama</Translate></p>
							<input type="radio" name="genreGroup" value='drama' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-fantasy">Fantasy</Translate></p>
							<input type="radio" name="genreGroup" value='fantasy' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-horror">Horror</Translate></p>
							<input type="radio" name="genreGroup" value='horror' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-mystery">Mystery</Translate></p>
							<input type="radio" name="genreGroup" value='mystery' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-scifi">SciFi</Translate></p>
							<input type="radio" name="genreGroup" value='sci-fi' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-sport">Sport</Translate></p>
							<input type="radio" name="genreGroup" value='sport' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-thriller">Thriller</Translate></p>
							<input type="radio" name="genreGroup" value='thriller' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-western">Western</Translate></p>
							<input type="radio" name="genreGroup" value='western' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
					</div>

					<div className="radio-genre-col">
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-action">Action</Translate></p>
							<input type="radio" name="genreGroup" value='action' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-animation">Animation</Translate></p>
							<input type="radio" name="genreGroup" value='animation' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-comedy">Comedy</Translate></p>
							<input type="radio" name="genreGroup" value='comedy' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-documentary">Documentary</Translate></p>
							<input type="radio" name="genreGroup" value='documentary' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-family">Family</Translate></p>
							<input type="radio" name="genreGroup" value='family' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-history">History</Translate></p>
							<input type="radio" name="genreGroup" value='history' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-music">Music</Translate></p>
							<input type="radio" name="genreGroup" value='music' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-musical">Musical</Translate></p>
							<input type="radio" name="genreGroup" value='musical' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-romance">Romance</Translate></p>
							<input type="radio" name="genreGroup" value='romance' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-sport">Short</Translate></p>
							<input type="radio" name="genreGroup" value='short' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-superhero">Superhero</Translate></p>
							<input type="radio" name="genreGroup" value='superhero' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
						<label className="genre-container">
							<p className="label-genre"><Translate id="search-war">War</Translate></p>
							<input type="radio" name="genreGroup" value='thriller' onChange={this.handleGenreValue}/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
			</div>
		)
	}
}
export default withLocalize(GenreSearch);
