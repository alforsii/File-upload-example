const express = require('express');
const router = express.Router();
const uploadCloud = require('../../config/cloudinary');
const Movie = require('../../models/Movie.model');

router.get('/', (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('index', { movies });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/movie/add', (req, res, next) => {
  res.render('movie-views/movies-form');
});

//uploadCloud.single('photo') - middleware photo is the name of input type file
router.post('/movie/add', uploadCloud.single('photo'), (req, res, next) => {
  const { title, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newMovie = new Movie({ title, description, imgPath, imgName });
  newMovie
    .save()
    .then(movie => {
      res.redirect('/');
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/movies-list', (req, res, next) => {
  Movie.find()
    .then(allMoviesFromDB => {
      res.render('movie-views/movies-list', { movies: allMoviesFromDB });
    })
    .catch(err => console.log(err));
});
router.get('/movie-details', (req, res, next) => {
  Movie.findById(req.query.movie_id)
    .then(foundMovie => {
      res.render('movie-views/movie-details', { theMovie: foundMovie });
    })
    .catch(err => console.log(err));
});

module.exports = router;
