const express = require('express');
const dotenv = require('dotenv');

const { loginUser, signupUser, logoutUser } = require('../controllers/auth.controllers.js');



const router = express.Router();

router.use(cors({
    origin: "https://globalchatting.netlify.app",
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Authorization', 'Content-Type', 'Access-Control-Allow-Origin'],
}));

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

module.exports = router
