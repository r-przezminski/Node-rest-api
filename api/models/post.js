const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  body: String,
  date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('Post', postSchema);
