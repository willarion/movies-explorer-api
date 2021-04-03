const mainRouter = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');

mainRouter.use('/', usersRouter);
mainRouter.use('/', moviesRouter);

module.exports = mainRouter;
