const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {
  try {
    const { authorization: token } = req.headers;
    const unAuthorizedResp = { ok: false, message: 'unauthorized' };

    if (!token) {
      return res.status(400).json(unAuthorizedResp);
    }
    try {
      await jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      return res.status(400).json(unAuthorizedResp);
    }
  } catch (error) {
    return res.satus(500).json({ ok: false, message: 'Internal error' });
  }
}

module.exports = {
  verifyToken
};
