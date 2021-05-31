const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createMovie,
  getMovies,
  deleteMovie,
  likeMovie,
  dislikeMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string().required(),
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
    params: Joi.object()
      .keys({
        movieId: Joi.string().length(24),
      })
      .unknown(true),
    query: Joi.object()
      .keys({
        _id: Joi.string().length(24),
      })
      .unknown(true),
  }),
  deleteMovie,
);
router.put(
  '/likes/:movieId',
  celebrate({
    params: Joi.object()
      .keys({
        movieId: Joi.string().length(24),
      })
      .unknown(true),
    query: Joi.object()
      .keys({
        _id: Joi.string().length(24),
      })
      .unknown(true),
  }),
  likeMovie,
);
router.delete(
  '/likes/:movieId',
  celebrate({
    params: Joi.object()
      .keys({
        movieId: Joi.string().length(24),
      })
      .unknown(true),
    query: Joi.object()
      .keys({
        _id: Joi.string().length(24),
      })
      .unknown(true),
  }),
  dislikeMovie,
);

module.exports = router;
