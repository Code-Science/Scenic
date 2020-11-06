const Joi = require('joi');

const commentSchema = Joi.object({
  comment: Joi.object({
    name: Joi.string().required(),
    text: Joi.string().required(),
  }).required(),
});

module.exports = {
  commentSchema,
};
