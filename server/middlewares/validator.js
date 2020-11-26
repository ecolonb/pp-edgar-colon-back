const User = require('../models/users');
const { use } = require('../routes/users');

const validator = async (req, res, next) => {
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
};

const validateRepeatedEmail = async (email) => {
  const user = await User.find({ email });
  return user.length > 0 ? true : false;
};

module.exports = { validator };
