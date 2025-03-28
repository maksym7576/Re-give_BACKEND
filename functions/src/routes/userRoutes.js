const express = require('express');
const router = express.Router();
const { registerUser, loginUser, listOfUsersWithRole } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users/roles', listOfUsersWithRole);

module.exports = router;