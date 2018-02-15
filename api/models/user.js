const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: mongoose.Types.ObjectId,
	email: {
		type: String,
		required: [true, 'email field is required']
	},
	password: {
		type: String,
		required: [true, 'password field is required']
	},
	firstName: String,
	lastName: String,
	address: [{city: String, street: String, zipCode: String}],
	phoneNumber: Number,
	avatar: String,
	nick: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;