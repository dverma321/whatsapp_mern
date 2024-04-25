const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { loginUser, signupUser, logoutUser } = require('../controllers/auth.controllers.js');



const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

module.exports = router
