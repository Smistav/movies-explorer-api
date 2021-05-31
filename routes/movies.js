const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required(),
      trailer: Joi.string().required(),
      thumbnail: Joi.string().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.string().required(),
    }),
    query: Joi.object()
      .keys({
        _id: Joi.string().length(24),
      })
      .unknown(true),
  }),
  createMovie,
);
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24),
    }).unknown(true),
    query: Joi.object()
      .keys({
        _id: Joi.string().length(24),
      })
      .unknown(true),
  }),
  deleteMovie,
);

module.exports = router;
