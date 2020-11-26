const router = require('express').Router();

const { validator } = require('../middlewares/validator');

const { verifyToken } = require('../middlewares/verify-token');

const { getUsers, createUser, deleteUser } = require('../controllers/users');

router.post('/new', validator, createUser);
router.get('/all/:search?', verifyToken, getUsers);
router.delete('/delete/:userId', verifyToken, deleteUser);

module.exports = router;
