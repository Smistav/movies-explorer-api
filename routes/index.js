const router = require('express').Router();
const signRoute = require('./sign');
const crashTestRoute = require('./crash-test');
const auth = require('../middlewares/auth');
const moviesRoute = require('./movies');
const usersRoute = require('./users');
const NotFoundError = require('../errors/NotFoundError');

router.use('/', crashTestRoute);
router.use('/', signRoute);
router.use('/', auth);
router.use('/users', usersRoute);
router.use('/movies', moviesRoute);
router.use('*', (req, res, next) => next(new NotFoundError('Not Found')));
module.exports = router;
