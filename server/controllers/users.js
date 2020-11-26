const bcrypt = require('bcrypt');
const User = require('../models/users');

const internalErrorResponse = { ok: false, message: 'Internal error' };

async function getUsers(req, res) {
  const { search } = req.params;
  let objToFind;
  if (search) {
    objToFind = {
      $or: [{ name: { $regex: search } }, { hobby: { $regex: search } }]
    };
  } else {
    objToFind = { deleted_at: undefined };
  }
  const users = await User.find(objToFind);
  return res.json({
    ok: true,
    totalResults: users.length,
    users
  });
}

async function createUser(req, res) {
  try {
    const userData = req.body;
    const salts = process.env.BCRYPT_SALT
      ? Number(process.env.BCRYPT_SALT)
      : 10;
    const hashedPassword = await bcrypt.hash(userData.password, salts);
    userData.password = hashedPassword;
    const user = new User(userData);

    await user.save();
    const response = {
      ok: true,
      message: 'success',
      body: req.body,
      user
    };

    return res.json(response);
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    const objToFind = {
      _id: userId,
      deleted_at: undefined
    };
    const user = await User.findOne(objToFind);
    if (!user) {
      return res.status(400).json({ ok: false, message: 'User doesnt exist.' });
    }
    user.deleted_at = new Date();
    await user.save();
    return res.json({ ok: true, user });
  } catch (error) {
    return res.status(500).json(internalErrorResponse);
  }
}

module.exports = {
  getUsers,
  createUser,
  deleteUser
};
