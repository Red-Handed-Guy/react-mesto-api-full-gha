const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { UnauthorizedError } = require('../errors/Unauthorized');

// напишите код здесь
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля name - 2'],
    maxlength: [30, 'Максимальная длина поля name - 30'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина поля name - 2'],
    maxlength: [30, 'Максимальная длина поля about - 30'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /https?:\/\/.*/.test(v);
      },
      message: (props) => `${props.value} - не валидная ссылка!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} - не валидный email!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError('Неправильные почта или пароль'),
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError('Неправильные почта или пароль'),
          );
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
