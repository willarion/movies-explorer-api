const Movie = require('../models/movie');
const {
  NotFoundError,
  InvalidRequestError,
  ForbiddenError,
} = require('../errors/errors');

function getMovies(req, res, next) {
  Movie.find({})
    .then((movies) => {
      if (!movies) {
        throw new Error();
      }
      res.send(movies);
    })
    .catch((err) => next(err));
}

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
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
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      console.log(err);

      if (err.name === 'ValidationError') {
        throw new InvalidRequestError('Введённые данные невалидны');
      }
      throw err;
    })
    .catch((err) => next(err));
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findOne({ _id: movieId })
    .orFail(() => {
      throw new NotFoundError('Фильма с таким id не существует');
    })
    .then((card) => {
      if ((card.owner).toString() !== userId) {
        throw new ForbiddenError('Нельзя удалять карточки других пользователей');
      } else {
        Movie.findByIdAndRemove(movieId)
          .then((movie) => res.send({
            data: movie,
            message: 'фильм удалён',
          }))
          .catch((err) => next(err));
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new InvalidRequestError('Невалидный id фильма');
      }
      next(err);
    })
    .catch((err) => next(err));
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
