const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

module.exports = {
  getMovieData: id => {
    return axios
      .get(
        `//api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres=${id}`
      )
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log('ERROR IN MOVIE API HELPER', err);
      });
  },

  getGenreData: id => {
    return axios
      .get(
        `//api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      )
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log('ERROR IN MOVIE API HELPER', err);
      });
  }

  //&with_genres=___
};
