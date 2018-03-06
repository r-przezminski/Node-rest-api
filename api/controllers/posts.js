const Post = require('../models/post');
const User = require('../models/user');

module.exports = {
  index: async (req, res) => {
    const posts = await Post.find({}).populate('user');
    return res.status(200).json(posts);
  },

  store: async (req, res, next) => {
    try {
      const post = new Post(req.body);
      const user = await User.findById(req.user.id);
      post.user = user;
      await post.save();
      user.posts.push(post);
      await user.save();
      return res.status(201).json({
        message: 'Post has been created successfull',
      });
    } catch (error) {
      return next(error);
    }
  },
};
