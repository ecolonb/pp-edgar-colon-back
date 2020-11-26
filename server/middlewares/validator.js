const User = require('../models/users');
const { use } = require('../routes/users');

async function validator(req, res, next) {
  const inputData = req.body;
  const errors = {};

  Object.entries(errors);
  if (!inputData.password) {
    errors.password = 'The password is required';
  }
  const validatedEmail = await validateRepeatedEmail(inputData.email);
  if (validatedEmail) {
    errors.email = 'The email already exist';
  }
  if (Object.entries(errors).length === 0) {
    next();
  } else {
    return res.status(400).json({ ok: false, errors });
  }
}

async function validateRepeatedEmail(email) {
  const user = await User.find({ email });
  return user.length > 0 ? true : false;
}

async function validateLoginData(req, res, next) {
  const { email, password } = req.body;
  if (!email || email === '' || !password || password === '') {
    return res.status(400).json({
      ok: false,
      message: 'Email and paswword are required'
    });
  }
  next();
}

module.exports = { validator, validateLoginData };
