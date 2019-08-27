const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes');

const corsConfig = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsConfig));

app.use('/api', indexRouter);

module.exports = app;

app.listen(8000);
