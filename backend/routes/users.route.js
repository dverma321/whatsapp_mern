const express = require('express');
const dotenv = require('dotenv');
const protectRoute = require('../middleware/protectRoute.js');
const usersToSideBar = require('../controllers/users.controller.js');

const route = express.Router();

route.get("/", protectRoute, usersToSideBar);


module.exports = route;
