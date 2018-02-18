const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Email address is required.'],
		validate: {
			validator: v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
			message: '{VALUE} is not valid email address.',
		}
	},
	password: {
		type: String,
		required: [true, 'Password field is required.']
	},
	firstName: String,
	lastName: String,
	address: [{city: String}, {street: String}, {zipCode: String}],
	phoneNumber: Number,
	avatar: String,
	nick: String,
});

module.exports = mongoose.model('User', userSchema);