const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  avatar: String,
  nick: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'post',
  }],
});

async function hashPassword(next) {
  try {
    const passwordHash = await bcrypt.hash(this.password, 10);
    this.password = passwordHash;
    return next();
  } catch (error) {
    return next(error);
  }
}

async function comparePasswords(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
}
userSchema.pre('save', hashPassword);
userSchema.methods.verifyPassword = comparePasswords;

module.exports = mongoose.model('User', userSchema);
