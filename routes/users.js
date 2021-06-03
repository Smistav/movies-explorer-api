const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, setUser } = require('../controllers/users');

router.get(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().email().required(),
    }),
    query: Joi.object()
      .keys({
        _id: Joi.string().length(24),
      })
      .unknown(true),
  }),
  getUser,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().email().required(),
    }),
    query: Joi.object()
      .keys({
        _id: Joi.string().length(24),
      })
      .unknown(true),
  }),
  setUser,
);

module.exports = router;
