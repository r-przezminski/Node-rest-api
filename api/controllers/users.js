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
  signUp: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json({
        message: 'This email address already exist',
      });
    }
    const newUser = new User(req.body);
    await newUser.save(true);
    const token = await generateToken(newUser);
    return res.status(201).json({
      message: 'Your account has been created, check your email to activate account',
      token,
    });
  },

  signIn: async (req, res) => {
    const token = await generateToken(req.user);
    return res.status(201).json({ token });
  },

  account: async (req, res) => res.status(200).json(req.user),

  userPosts: async (req, res) => {
    const user = await User.findById(req.user.id).populate('posts');
    return res.status(200).json({
      posts: user.posts,
    });
  },
};
