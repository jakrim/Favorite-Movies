const movieModel = require('../models/movieModel.js');
const { getMovieData, getGenreData } = require('../helpers/apiHelpers.js');
const { find, save, deleted } = require('../models/movieModel.js');
const axios = require('axios');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    var id = req.params.id;
    getMovieData(id)
      .then(data => {
        res.send(data.data);
      })
      .catch(err => {
        console.log('ERROR IN MOVIE CONTROLLER', err);
      });
  },
  getGenres: (req, res) => {
    // req.params;
    getGenreData()
      .then(data => {
        res.send(data.data);
      })
      .catch(err => {
        console.log('ERROR IN MOVIE CONTROLLER', err);
      });
  },

  getAllMovies: (req, res) => {
    find()
      .then(data => {
        // console.log(data);
        res.send(data);
      })
      .catch(err => {
        console.log('getallmovies error', err);
      });
  },

  saveMovie: (req, res) => {
    let movie = req.body.movie;
    // console.log('TCL: moviIMFOSAODSMKADMOKAMOIe', movie);
    save(movie)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  },

  deleteMovie: (req, res) => {
    let movie = req.body.movie.title;
    console.log(movie);
    deleted(movie)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log('DELETE CONTROLLER ERR', err);
        res.sendStatus(500);
      });
  }
};

// get the search genre
// https://www.themoviedb.org/account/signup
// get your API KEY
// use this endpoint to search for movies by genres, you will need an API key
// https://api.themoviedb.org/3/discover/movie
// and sort them by horrible votes using the search parameters in the API
