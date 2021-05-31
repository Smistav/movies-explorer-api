const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .sort('field -createdAt')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;
  Movie.create({ name, link, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (String(movie.owner) === req.user._id) {
        return movie;
      }
      return next(new ForbiddenError('Нельзя удалять чужие карточки'));
    })
    .then((movie) => Movie.findByIdAndRemove(movie._id)
      .then((movieRemoved) => res.send({ data: movieRemoved })))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Карточка с указанным ${req.params.movieId} не найдена`));
      }
    });
};

module.exports.likeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.movieId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Карточка с указанным ${req.params.cardId} не найдена`));
      }
    });
};

module.exports.dislikeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.movieId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для снятия лайка'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Карточка с указанным ${req.params.movieId} не найдена`));
      }
    });
};
