const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const { ValidationError } = require('../errors/Validation');
const { NotFoundError } = require('../errors/Not_found');
const { ConflictError } = require('../errors/Conflict');

function findAndUpdate(newData, req, res, next) {
  User.findByIdAndUpdate(req.user._id, newData, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new ValidationError(`Переданы некорректные данные ${err.message}`),
        );
      } else {
        next(err);
      }
    });
}

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.aboutUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const { _id } = user;
      res.status(201).send({
        name,
        about,
        avatar,
        email,
        _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new ValidationError(`Переданы некорректные данные ${err.message}`),
        );
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.modifyUser = (req, res, next) => {
  const { name, about } = req.body;
  findAndUpdate({ name, about }, req, res, next);
};

module.exports.modifyUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  findAndUpdate({ avatar }, req, res, next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const {
        name, about, avatar, _id,
      } = user;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        {
          expiresIn: 3600 * 24 * 7,
        },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({
          name,
          about,
          avatar,
          email,
          _id,
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.logout = (req, res) => res
  .cookie('jwt', 'logout', {
    maxAge: 60,
    httpOnly: true,
  })
  .end();
