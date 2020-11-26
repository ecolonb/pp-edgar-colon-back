const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { dbConnection } = require('./database/config');

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dbConnection();

app.get('/', (req, res, next) => {
  console.log('req: ', req);
  return res.send('Api is running... documentation api here');
});

app.use('/api/users', require('./routes/users.js'));

module.exports = app;
