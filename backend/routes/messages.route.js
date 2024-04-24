const express = require('express');
const dotenv = require('dotenv');
const protectRoute = require('../middleware/protectRoute.js');
const cookieParser = require('cookie-parser');

dotenv.config();

const { messageRoutes, getMessages  } = require('../controllers/message.controller.js');

const router = express.Router();
router.use(cookieParser()); // Use cookie-parser middleware first to parse cookies

// CORS configuration
router.use(cors({
    origin: "https://globalchatting.netlify.app",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Set credentials to true for cookies
    allowedHeaders: 'Authorization, Content-Type', // Include necessary headers
}));

router.post("/send/:id", protectRoute, messageRoutes); // you have to import the same name like messageRoutes in your controller
router.get("/:id", protectRoute, getMessages); 

module.exports = router;
