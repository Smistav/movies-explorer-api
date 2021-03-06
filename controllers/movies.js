const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director,
    duration,
    year, description, image,
    trailer,
    thumbnail,
    nameRU, nameEN,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (String(movie.owner) === req.user._id) {
        return movie;
      }
      return next(new ForbiddenError('Нельзя удалять чужие фильмы'));
    })
    .then((movie) => movie.remove().then((movieRemoved) => res.send(movieRemoved)))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Фильм с указанным ${req.params.movieId} не найден`));
      } else {
        next(err);
      }
    });
};
