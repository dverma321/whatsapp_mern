const express = require('express');
const dotenv = require('dotenv');

const { loginUser, signupUser, logoutUser } = require('../controllers/auth.controllers.js');



const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

module.exports = router