const Post = require('../models/post');
const User = require('../models/user');

module.exports = {
  getPosts: async (req, res) => {
    const posts = await Post.find({});
    return res.status(200).json(posts);
  },
  addPost: async (req, res, next) => {
    try {
      const { _id: userId } = req.userData;
      const post = new Post(req.body);
      const user = await User.findById(userId);
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
