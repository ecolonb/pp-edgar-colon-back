const router = require('express').Router();

const { validator } = require('../middlewares/validator');

const { getUsers, createUser, deleteUser } = require('../controllers/users');

router.post('/new', validator, createUser);
router.get('/all/:search?', getUsers);
router.delete('/delete/:userId', deleteUser);

module.exports = router;
