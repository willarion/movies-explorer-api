const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');


router.get('/movies', getMovies);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/^https?:\/\/(www.)?[\w-]{1,63}\.[\w-]{1,256}[a-z-._~:\/?#\[\]@!$&'()*+,;=\w]*#?/i),
    trailer: Joi.string().required().regex(/^https?:\/\/(www.)?[\w-]{1,63}\.[\w-]{1,256}[a-z-._~:\/?#\[\]@!$&'()*+,;=\w]*#?/i),
    thumbnail: Joi.string().required().regex(/^https?:\/\/(www.)?[\w-]{1,63}\.[\w-]{1,256}[a-z-._~:\/?#\[\]@!$&'()*+,;=\w]*#?/i),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().regex(/^[а-яё0-9]+[а-яё0-9\s\.\?!,:;-=+&'()\*]*/i),
    nameEN: Joi.string().required().regex(/^[a-z0-9]+[a-z0-9\s\.\?!,:;-=+&'()\*]*/i),
  })
}), createMovie);
router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
}), deleteMovie)


module.exports = router;
