const Joi = require('joi');

module.exports = {
  validate: schema => (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json(result.error);
    }
    return next();
  },

  userSchema: {
    signUpSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(10).required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
    }),

    signInSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(10).required(),
    }),
  },

  postSchema: {
    storeSchema: Joi.object().keys({
      title: Joi.string().min(3).required(),
      body: Joi.string().min(10).max(500).required(),
    }),
  },
};
