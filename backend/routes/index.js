const router = require('express').Router();
const { celebrate } = require('celebrate');
const { loginValid, createUserValid } = require('../tools/validators');
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');
const { NotFoundError } = require('../errors/Not_found');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', celebrate(loginValid), login);
router.post('/signup', celebrate(createUserValid), createUser);

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.patch('/logout', auth, logout);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Ссылка не найдена'));
});

module.exports = router;
