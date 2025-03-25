const express = require('express');
const router = express.Router();
const { registerUser, loginUser, listOfUsersWithRole } = require('../controllers/userController');

router.get('/users/roles', listOfUsersWithRole);

module.exports = router;