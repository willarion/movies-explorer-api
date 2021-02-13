const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUserProfile, updateUserProfile } = require('../controllers/users');

router.get('/users/me', getUserProfile);
router.put('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(2).max(30).email(),
    name: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);

module.exports = router;
