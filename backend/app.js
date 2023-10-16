require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// Слушаем 3000 порт
const {
  NODE_ENV, PORT, MDB_URL, BASE_URL,
} = process.env;
const { ServerError } = require('./errors/Server');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(NODE_ENV === 'production' ? MDB_URL : 'mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.use(cookieParser());

app.use(requestLogger);

const corsOptions = {
  origin: ['http://127.0.0.1:3001', BASE_URL],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true,
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(require('./routes/index'));

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const errStatuses = [400, 401, 403, 404, 409];
  if (errStatuses.includes(err.statusCode)) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    const serverErr = new ServerError('На сервере произошла ошибка');
    res.status(serverErr.statusCode).send({ message: serverErr.message });
  }
});

app.listen(NODE_ENV === 'production' ? PORT : 3000, () => {
  console.log(`App start on PORT ${NODE_ENV === 'production' ? PORT : 3000}`);
});
