const jwt = require('jsonwebtoken');

const User = require('../models/user');

const generateToken = user => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const secret = process.env.JWT_KEY;
  const exp = { expiresIn: '1h' };
  return jwt.sign(payload, secret, exp);
};

module.exports = {
  userRegister: async (req, res, next) => {
    try {
      const user = await User.find({ email: req.body.email });
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'This email address already exist',
        });
      }
      if (req.body.password !== req.body.repeatPassword) {
        return res.status(500).json({
          message: 'Paswords are not the same.',
        });
      }
      const newUser = new User(req.body);
      await newUser.save();
      const token = await generateToken(newUser);
      return res.status(201).json({
        message: 'Your account has been created, check your email to activate account',
        token,
      });
    } catch (error) {
      return next(error);
    }
  },

  userLogin: async (req, res, next) => {
    try {
      const token = await generateToken(req.user);
      return res.status(201).json({ token });
    } catch (error) {
      return next(error);
    }
  },

  userAccount: async (req, res) => res.status(200).json(req.user),
};
