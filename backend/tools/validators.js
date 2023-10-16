const { Joi } = require('celebrate');

module.exports.createUserValid = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/.*/),
  }),
};

module.exports.loginValid = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports.createCardValid = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .regex(/https?:\/\/.*/),
  }),
};

module.exports.cardIdValid = {
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
};

module.exports.modifyUserValid = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

module.exports.modifyUserAvatarValid = {
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/https?:\/\/.*/),
  }),
};

module.exports.getUserByIdValid = {
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
};
