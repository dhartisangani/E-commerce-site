const express = require('express')
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../modals/User')
const fetchuser = require('../middleWare/fetchuser');
const { signup, login, getProfile } = require('../Controller/authController');

// create new user
router.post('/signup', signup)

//login
router.post('/login', login)

// get user detail with username and email 
router.get('/userdata', fetchuser, getProfile)

// get total number of logged user 
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve users" });
    }
});

module.exports = router
