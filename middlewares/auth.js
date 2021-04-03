const jwt = require('jsonwebtoken');
const {
  UnathorizedError
} = require('../errors/errors');
const { noAccess } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new UnathorizedError(noAccess);
    next(err);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'shhhh-it-is-secret');
  } catch {
    const err = new UnathorizedError(noAccess);
    next(err);
  }

  req.user = payload;

  return next();
};
