const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  console.log('req: ', req);
  return res.send('Api is running...');
});

module.exports = app;
