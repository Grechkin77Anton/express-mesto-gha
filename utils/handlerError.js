const handlerError = (err, res) => {
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  } else {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  handlerError,
};
