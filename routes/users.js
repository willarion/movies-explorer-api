const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUserProfile, updateUserProfile } = require('../controllers/users');
const errorMessages = require('../utils/constants');

router.get('/users/me', getUserProfile);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(2).max(30).email()
      .messages({
        'string.base': `Email ${errorMessages.dataFormat}`,
        'string.email': `Email ${errorMessages.dataFormat}`,
        'string.empty': errorMessages.requiredField,
        'any.required': errorMessages.requiredField,
        'string.min': `${errorMessages.min} 2`,
        'string.max': `${errorMessages.max} 30`,
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.base': `Имя ${errorMessages.dataFormat}`,
        'string.empty': errorMessages.requiredField,
        'any.required': errorMessages.requiredField,
        'string.min': `${errorMessages.min} 2`,
        'string.max': `${errorMessages.max} 30`,
      }),
  }),
}), updateUserProfile);

module.exports = router;
