const { commentSchema } = require('./JoiSchemas/schemas');
const ExpressError = require('./utils/ExpressError');

const validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(',');
    throw new ExpressError(400, message);
  } else {
    next();
  }
};

module.exports = {
  validateComment,
};
