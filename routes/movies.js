const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const errorMessages = require('../utils/constants');

router.get('/movies', getMovies);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.base': `Название страны ${errorMessages.dataFormat}`,
        'string.empty': errorMessages.requiredField,
        'any.required': errorMessages.requiredField,
      }),
    director: Joi.string().required()
      .messages({
        'string.base': `Имя режиссёра ${errorMessages.dataFormat}`,
        'string.empty': errorMessages.requiredField,
        'any.required': errorMessages.requiredField,
      }),
    duration: Joi.number().required()
      .messages({
        'number.base': `Продолжительность ${errorMessages.dataFormat}`,
        'any.required': errorMessages.requiredField,
      }),
    year: Joi.string().required()
      .messages({
        'string.base': `Год ${errorMessages.dataFormat}`,
        'string.empty': errorMessages.requiredField,
        'any.required': errorMessages.requiredField,
      }),
    description: Joi.string().required()
      .messages({
        'string.base': `Описание ${errorMessages.dataFormat}`,
        'string.empty': errorMessages.requiredField,
        'any.required': errorMessages.requiredField,
      }),
    image: Joi.string().required().regex(/^https?:\/\/(www.)?[\w-]{1,63}\.[\w-]{1,256}[a-z-._~:\/?#[\]@!$&'()*+,;=\w]*#?/i)
      .messages({
        'string.base': `Ссылка ${errorMessages.dataFormat}`,
        'string.empty': errorMessages.requiredField,
        'any.required': errorMessages.requiredField,
        'string.pattern.base': `Ссылка ${errorMessages.dataFormat}`,
      }),
    trailer: Joi.string().required().regex(/^https?:\/\/(www.)?[\w-]{1,63}\.[\w-]{1,256}[a-z-._~:\/?#[\]@!$&'()*+,;=\w]*#?/i)
      .messages({
        'string.base': `Ссылка ${errorMessages.dataFormat}`,
        'string.empty': errorMessages.requiredField,
        'any.required': errorMessages.requiredField,
        'string.pattern.base': `Ссылка ${errorMessages.dataFormat}`,
      }),
    thumbnail: Joi.string().required().regex(/^https?:\/\/(www.)?[\w-]{1,63}\.[\w-]{1,256}[a-z-._~:\/?#[\]@!$&'()*+,;=\w]*#?/i)
      .messages({
        'string.base': `Ссылка ${errorMessages.dataFormat}`,
        'string.empty': errorMessages.requiredField,
        'any.required': errorMessages.requiredField,
        'string.pattern.base': `Ссылка ${errorMessages.dataFormat}`,
      }),
    movieId: Joi.number().required()
      .messages({
        'number.base': `Id ${errorMessages.dataFormat}`,
        'any.required': errorMessages.requiredField,
      }),
    nameRU: Joi.string().required().regex(/^[а-яё0-9]+[а-я0-9\s.?!,:;\-=+&'()*]*/i)
      .messages({
        'string.base': `Название ${errorMessages.dataFormat}`,
        'string.empty': errorMessages.requiredField,
        'any.required': errorMessages.requiredField,
        'string.pattern.base': `Название ${errorMessages.dataFormat}`,
      }),
    nameEN: Joi.string().required().regex(/^[a-z0-9]+[a-z0-9\s.?!,:;\-=+&'()*]*/i)
      .messages({
        'string.base': `Название ${errorMessages.dataFormat}`,
        'string.empty': errorMessages.requiredField,
        'any.required': errorMessages.requiredField,
        'string.pattern.base': `Название ${errorMessages.dataFormat}`,
      }),
  }),
}), createMovie);
router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24)
      .messages({
        'string.alphanum': `Id ${errorMessages.dataFormat}`,
        'string.length': `Id ${errorMessages.dataFormat}`,
      }),
  }),
}), deleteMovie);

module.exports = router;
