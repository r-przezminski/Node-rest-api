const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const corsHeaders = require('./api/middleware/cors');

const app = express();

mongoose.connect('mongodb://localhost/Node-rest-api');
mongoose.Promise = global.Promise;

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(corsHeaders);

app.use('/api/user', require('./api/routes/user'));
app.use('/api/posts', require('./api/routes/post'));

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
