const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: String,
	body: String,
	date: Date,
	user: {
		
	}
})