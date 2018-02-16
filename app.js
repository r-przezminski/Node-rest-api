const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const corsHeaders = require('./api/middleware/cors');

const app = express();

// START MONGODB
//"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"
mongoose.connect('mongodb://localhost/Node-rest-api');
mongoose.Promise = global.Promise;

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(corsHeaders);

app.use('/api/user', require('./api/routes/user'));

app.use((req, res, next) => {
	const err = new Error("Not found");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

module.exports = app;