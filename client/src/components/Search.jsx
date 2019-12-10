import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [
        'Action',
        'Adventure',
        'Animation',
        'Comedy',
        'Crime',
        'Documentary',
        'Drama',
        'Family',
        'Fantasy',
        'History',
        'Horror',
        'Music',
        'Mystery',
        'Romance',
        'Science Fiction',
        'TV Movie',
        'Thriller',
        'War',
        'Western'
      ],
      currentGenre: ''
    };
    this.getGenres = this.getGenres.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getGenres();
    // this.props.getSavedMovies(this.state.currentGenreId);
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios
      .get('/movies/genres')
      .then(({ data }) => {
        this.setState({
          genres: data.genres
        });
      })
      .catch(err => {
        console.log('ERROR IN SEARCH.JS', err);
      });
  }

  handleSelection(event) {
    this.setState({ currentGenre: event.target.value });
  }

  handleClick(event) {
    event.preventDefault();
    this.props.getMovies(this.state.currentGenre);
    console.log(this.state.currentGenre);
  }

  render() {
    return (
      <div className='search'>
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? 'Show Results' : 'Show Favorites'}
        </button>
        <br />
        <br />
        <select onChange={this.handleSelection}>
          {this.state.genres.map(genre => {
            return (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}

export default Search;
