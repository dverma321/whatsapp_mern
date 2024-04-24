const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const protectRoute = require('../middleware/protectRoute.js');
const usersToSideBar = require('../controllers/users.controller.js');

const route = express.Router();

route.use(cookieParser()); // Use cookie-parser middleware first to parse cookies

route.get("/", protectRoute, usersToSideBar);

module.exports = route;
