const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const protectRoute = require('../middleware/protectRoute.js');
const usersToSideBar = require('../controllers/users.controller.js');

const route = express.Router();

route.use(cookieParser()); // Use cookie-parser middleware to parse cookies from the backend

route.use(cors(
    {
        origin: "https://globalchatting.netlify.app",
        // origin:"https://findyourperfectmatch.netlify.app",
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // set the cookie true
        optionsSuccessStatus: 204,     // Respond with a 204 status code for preflight requests
        allowedHeaders: 'Authorization, Content-Type', // Add required headers
    }
));


route.get("/", protectRoute, usersToSideBar);


module.exports = route;
