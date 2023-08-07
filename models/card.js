const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String, // имя — это строка
    required: [true, 'Обязательное поле'],
    minlength: [2, 'Минимальная длина имени — 2 символа'],
    maxlength: [30, 'Максимальная — 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator(v) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(v);
      },
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
