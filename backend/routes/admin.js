const express = require('express')
const admin = express.Router();
const { signup, login } = require('../Controller/adminAuthController.js');

// create new admin
admin.post('/signup', signup)

// admin log in
admin.post('/login', login)

module.exports = admin
