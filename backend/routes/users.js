const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUserById,
  modifyUser,
  modifyUserAvatar,
  aboutUser,
} = require('../controllers/users');
const { modifyUserValid, modifyUserAvatarValid, getUserByIdValid } = require('../tools/validators');

router.get('/', getUsers);
router.get('/me', aboutUser);
router.get(
  '/:userId',
  celebrate(getUserByIdValid),
  getUserById,
);
router.patch(
  '/me',
  celebrate(modifyUserValid),
  modifyUser,
);
router.patch(
  '/me/avatar',
  celebrate(modifyUserAvatarValid),
  modifyUserAvatar,
);

module.exports = router;
