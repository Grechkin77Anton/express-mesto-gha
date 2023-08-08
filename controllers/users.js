const { default: mongoose } = require('mongoose');
const User = require('../models/user');
// const handlerError = require('../utils/handlerError');

module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: 'Некоректный _id' });
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
//   if (req.params.userId.length === 24) {
//   User.findById(req.params.userId)
//     .orFail()
//     .then((user) => {
//       if (!user) {
//         res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
//         return;
//       }
//       res.send(user);
//     })
//     .catch((err) => handlerError(err, res));
//   .catch(() => res.status(404).send({ message: 'Пользователь по указанному _id не найден' }));
// } else {
//     res.status(400).send({ message: 'Некорректный _id пользователя' });
//   }
};

module.exports.editDataUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      }
    });
};

module.exports.editAvatarUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: 'true', runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      }
    });
};
