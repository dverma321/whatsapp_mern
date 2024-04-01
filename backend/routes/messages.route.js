const express = require('express');
const dotenv = require('dotenv');
const protectRoute = require('../middleware/protectRoute.js');

dotenv.config();

const { messageRoutes, getMessages  } = require('../controllers/message.controller.js');

const router = express.Router();

router.post("/send/:id", protectRoute, messageRoutes); // you have to import the same name like messageRoutes in your controller
router.get("/:id", protectRoute, getMessages); 

module.exports = router;
