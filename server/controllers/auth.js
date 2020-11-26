const bcrypt = require('bcrypt');
const User = require('../models/users');
const { v4: uuid } = require('uuid');

const { createToken } = require('../helpers/jwt');

async function login(req, res) {
  try {
    const wrongLoginResp = {
      ok: false,
      message: 'Username or password are incorrect'
    };
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.deleted_at) {
      return res.status(400).json(wrongLoginResp);
    }
    const valid = await bcrypt.compareSync(password, user.password);
    if (valid) {
      const token = await createToken(uuid());
      return res.json({
        ok: true,
        token
      });
    } else {
      return res.status(400).json(wrongLoginResp);
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Internal error'
    });
  }
}

module.exports = {
  login
};
