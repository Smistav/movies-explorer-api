const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

const urlValid = (value, helpers) => {
  if (isURL(value)) {
    return value;
  }
  return helpers.message('URL невалиден');
};

router.get('/', getMovies);
router.post('/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().integer().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(urlValid),
      trailer: Joi.string().required().custom(urlValid),
      thumbnail: Joi.string().required().custom(urlValid),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.number().integer().required(),
    }),
    query: Joi.object()
      .keys({
        _id: Joi.string().length(24),
      })
      .unknown(true),
  }),
  createMovie);
router.delete('/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex().length(24),
    }).unknown(true),
    query: Joi.object()
      .keys({
        _id: Joi.string().length(24),
      })
      .unknown(true),
  }),
  deleteMovie);

module.exports = router;
