const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config(); // load process.env variables
const { errors, celebrate, Joi } = require('celebrate');
const limiter = require('./middlewares/limiter');
const mainRouter = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const { NotFoundError } = require('./errors/errors');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorMessages = require('./utils/constants');

const { NODE_ENV, MONGODB } = process.env;
const app = express();
const PORT = 3000;

mongoose.connect(NODE_ENV === 'production' ? MONGODB : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1); // for nginx
app.use(requestLogger);
app.use(limiter);

app.use(cors());

app.use(helmet());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.use(auth);

app.use('/', mainRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError(errorMessages.noPage));
});

app.use(errorLogger);

app.use(errors()); // celebrate errors

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? errorMessages.serverError
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
