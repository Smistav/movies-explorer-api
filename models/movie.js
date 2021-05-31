const mongoose = require('mongoose');

const REGEXPLINK = /https?:\/\/(www\.)?[a-z0-9-.]{3,20}[a-z]{2,6}[-._~:/[\]?#@!$&'()*+,;=a-z0-9]*/g;
const REGEXPEN = /^[a-zA-Z0-9-]+$/g;
const REGEXPRU = /^[а-яёА-ЯЁ-]+$/g;

const movieSchema = new mongoose.Schema({
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
    validate: {
      validator(link) {
        return REGEXPLINK.test(link);
      },
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator(link) {
        return REGEXPLINK.test(link);
      },
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator(link) {
        return REGEXPLINK.test(link);
      },
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    validate: {
      validator(link) {
        return REGEXPRU.test(link);
      },
    },
    required: true,
  },
  nameEn: {
    type: String,
    validate: {
      validator(link) {
        return REGEXPEN.test(link);
      },
    },
    required: true,
  },
});
module.exports = mongoose.model('movie', movieSchema);
