const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NODE_ENV, JWT_SECRET } = process.env;
const {
  NotFoundError,
  UnathorizedError,
  InvalidRequestError,
  DataConflictError,
} = require('../errors/errors');


function getUserProfile(req, res, next) {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователя с таким id не существует');
    })
    .then((user) =>
      res.send({
        email: user.email,
        name: user.name
      })
    )
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new InvalidRequestError('Невалидный id пользователя');
      }
      next(err);
    })
    .catch((err) => next(err));
}

function updateUserProfile(req, res, next) {
  User.findByIdAndUpdate(req.user._id,
    {
      email: req.body.email,
      name: req.body.name,
    }, {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .orFail(() => {
      throw new NotFoundError('Пользователя с таким id не существует');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new InvalidRequestError('Введённые данные невалидны');
      }
      if (err.kind === 'ObjectId') {
        throw new InvalidRequestError('Невалидный id пользователя');
      }
      next(err);
    })
    .catch((err) => next(err));
}

function createUser(req, res, next) {
  const {
    email, password, name
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new DataConflictError('Пользователь уже зарегистрирован');
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            email,
            password: hash,
            name
          }))
          .then((user) =>
            res.send({
              email: user.email,
              name: user.name
            })
          )
          .catch((err) => {
            if (err.name === 'ValidationError') {
              throw new InvalidRequestError('Введённые данные невалидны');
            }
            next(err);
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'shhhh-it-is-secret', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(() => {
      throw new UnathorizedError('Необходима авторизация');
    })
    .catch((err) => next(err));
}


module.exports = {
  getUserProfile,
  updateUserProfile,
  createUser,
  login,
};