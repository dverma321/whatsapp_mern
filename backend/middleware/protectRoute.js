const jwtoken = require('jsonwebtoken');
const newUser = require('../models/user.model');
require('dotenv').config();

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        console.log("Token in Protected Route is : ", token);

        if (!token) {
            return res.status(401).json({
                error: "Unauthorized User - No Token Provided"
            });
        }

        const decoded = jwtoken.verify(token, process.env.JWT_SecretKey);
        console.log("Decoded jwtoken : ", decoded);

        if (!decoded || !decoded.userId) {
            console.log("Invalid Token ");
            return res.status(401).json({
                error: "Invalid Token "
            });
        }
        
        const userId = decoded.userId; // Extract userId from decoded JWT

        if (!userId) {
            console.log("Missing userId");
            return res.status(401).json({
                error: "Missing userId"
            });
        }


        const user = await newUser.findById(userId).select("-password"); // here password is removing by using  minus sign

        if (!user) {
            console.log("User Not Found for ID:", decoded.userId);
            return res.status(404).json({
                error: "User Not Found"
            });
        }

        req.user = user;

        
        next();
    } catch (error) {
        console.log("Error in Protected Middleware:", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

module.exports = protectRoute;
