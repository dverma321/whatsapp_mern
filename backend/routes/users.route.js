const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const protectRoute = require('../middleware/protectRoute.js');
const usersToSideBar = require('../controllers/users.controller.js');

const route = express.Router();

route.use(cookieParser()); // Use cookie-parser middleware to parse cookies from the backend


route.get("/", cors(), protectRoute, usersToSideBar);


module.exports = route;
