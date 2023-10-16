const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  createCard,
  getCards,
  delCardById,
  putLike,
  removeLike,
} = require('../controllers/cards');
const { createCardValid, cardIdValid } = require('../tools/validators');

router.get('/', getCards);
router.delete(
  '/:cardId',
  celebrate(cardIdValid),
  delCardById,
);
router.post(
  '/',
  celebrate(createCardValid),
  createCard,
);
router.put(
  '/:cardId/likes',
  celebrate(cardIdValid),
  putLike,
);
router.delete(
  '/:cardId/likes',
  celebrate(cardIdValid),
  removeLike,
);

module.exports = router;
