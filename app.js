const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middlewares/error-handler');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

app.use(limiter);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewURLParser: true,
});

app.use('/', require('./routes/index'));

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
