import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx';
import Movies from './components/Movies.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      favorites: [],
      showFaves: false
    };
    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.getSavedMovies = this.getSavedMovies.bind(this);
  }

  componentDidMount() {
    this.getMovies(28);
    this.getSavedMovies();
  }

  getMovies(id) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios
      .get(`movies/search/${id}`)
      .then(({ data }) => {
        this.setState({
          movies: data.results
        });
      })
      .catch(err => {
        console.log('ERROR IN INDEX.JS', err);
      });
  }

  saveMovie(movie) {
    // console.log(movie);
    // same as above but do something diff
    axios
      .post('/movies/save', { movie })
      .then(() => {
        this.getSavedMovies();
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteMovie(movie) {
    // same as above but do something diff
    // console.log(movie);
    axios
      .post('/movies/delete', { movie: movie })
      .then(() => {
        this.getSavedMovies();
      })
      .catch(err => {
        console.log(err);
      });
    // .then(() => {
    //   this.getSavedMovies();
    // });
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  getSavedMovies() {
    axios
      .get('/movies/retrieve')
      .then(({ data }) => {
        this.setState({
          favorites: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='app'>
        <header className='navbar'>
          <h1>Choose Some Great Movies</h1>
          <p>Click to add a movie to your Favorites!</p>
        </header>
        <div className='main'>
          <Search
            swapFavorites={this.swapFavorites}
            getMovies={this.getMovies}
            showFaves={this.state.showFaves}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
            saveMovie={this.saveMovie}
            deleteMovie={this.deleteMovie}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
