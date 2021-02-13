const mongoose = require('mongoose');
const urlValidator = require('validator');


const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlValidator.isURL(v);
      },
      message: 'Ссылка на картинку не соответствует формату :( Попробуйте ещё раз',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlValidator.isURL(v);
      },
      message: 'Ссылка на трейлер не соответствует формату :( Попробуйте ещё раз',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlValidator.isURL(v);
      },
      message: 'Ссылка на картинку не соответствует формату :( Попробуйте ещё раз',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('movie', userSchema);
