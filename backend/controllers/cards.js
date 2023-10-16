const Card = require('../models/card');
const { ValidationError } = require('../errors/Validation');
const { NotFoundError } = require('../errors/Not_found');
const { ForbiddenError } = require('../errors/Forbidden');

function toggleLike(cardId, res, options, next) {
  Card.findByIdAndUpdate(cardId, options, { new: true })
    .orFail(() => new NotFoundError('Запрашиваемая карточка не найдена'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
}

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      const {
        owner, likes, _id, createdAt,
      } = card;
      res.send({
        name,
        link,
        owner,
        likes,
        _id,
        createdAt,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new ValidationError(`Переданы некорректные данные ${err.message}`),
        );
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

module.exports.delCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => new NotFoundError('Запрашиваемая карточка не найдена'))
    .then((card) => {
      if (!(card.owner.toString() === req.user._id)) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку!');
      }
      return card.deleteOne().then((delCard) => res.send(delCard));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.putLike = (req, res, next) => {
  const { cardId } = req.params;
  toggleLike(cardId, res, { $addToSet: { likes: req.user._id } }, next);
};

module.exports.removeLike = (req, res, next) => {
  const { cardId } = req.params;
  toggleLike(cardId, res, { $pull: { likes: req.user._id } }, next);
};
