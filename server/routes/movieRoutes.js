const router = require('express').Router();
const {
  getSearch,
  getGenres,
  saveMovie,
  deleteMovie,
  getAllMovies
} = require('../controllers/movieController.js');

//Route different requests to different endpoints
router.get('/search/:id', getSearch);
router.get('/genres', getGenres);
router.get('/retrieve', getAllMovies);
router.post('/save', saveMovie);
router.post('/delete', deleteMovie);

module.exports = router;

// {getSearch, getGenres, saveMovie, deleteMovie}
