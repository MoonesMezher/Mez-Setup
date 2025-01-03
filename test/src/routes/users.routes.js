const express = require('express');
const router = express.Router();

// Methods
const usersController = require('../controllers/users.controllers');

// POST
router.post('/login', usersController.loginAdmin);

module.exports = router;