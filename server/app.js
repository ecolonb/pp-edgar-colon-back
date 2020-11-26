const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/users.js');
const { login } = require('./controllers/auth');
const { dbConnection } = require('./database/config');
const { validateLoginData } = require('./middlewares/validator');
const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dbConnection();

app.get('/', (req, res, next) => {
  return res.send('Api is running... documentation api here');
});

app.post('/api/login', validateLoginData, login);
app.use('/api/users', userRoutes);

module.exports = app;
