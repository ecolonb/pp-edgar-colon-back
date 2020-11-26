const jwt = require('jsonwebtoken');

async function createToken(uid, sub = '') {
  try {
    const exp = process.env.TOKEN_EXPIREIN
      ? Number(process.env.TOKEN_EXPIREIN)
      : 3600;
    const payload = {
      jti: uid,
      sub,
      exp: Math.floor(Date.now() / 1000) + exp
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  } catch (error) {
    return '';
  }
}

module.exports = {
  createToken
};
