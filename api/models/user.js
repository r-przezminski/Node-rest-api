const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  avatar: String,
  nick: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
});

async function hashPassword(next, isNewUser) {
  try {
    if (typeof isNewUser === 'boolean' && isNewUser === true) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

async function verifyPassword(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
}

userSchema.pre('save', hashPassword);
userSchema.methods.verifyPassword = verifyPassword;

module.exports = mongoose.model('User', userSchema);
