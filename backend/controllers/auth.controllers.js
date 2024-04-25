const newUser = require("../models/user.model.js");
const bcryptjs = require('bcryptjs');
const generateJsonWebToken = require("../utils/generateJWToken.js");


// signup function

const signupUser = async (req, res) => {

    try {
        const { uname, name, email, password, cpassword, gender, phone } = req.body;

        if (password != cpassword) {
            console.log("Password are not the same");
            return res.json({ message: "Password are not the same" });
        }

        const userPresent = await newUser.findOne({ uname });
        const emailPresent = await newUser.findOne({ email });
        const phonePresent = await newUser.findOne({ phone });

        if (userPresent) {
            return res.status(400).json({ message: "Username already exists." });
        }

        if (emailPresent) {
            return res.status(401).json({ message: "Email already exists." });
        }

        if (phonePresent) {
            return res.status(402).json({ message: "Phone number already exists." });
        }


        // using api for pics 'https://avatar-placeholder.iran.liara.run'

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${uname}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${uname}`;

        // hashing the password

        const saltRound = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, saltRound);

        const userCreated = new newUser({
            uname,
            name,
            email,
            password: hashPassword,
            cpassword,
            profilepic: gender === 'male' ? boyProfilePic : girlProfilePic,
            gender,
            phone
        })

        if (userCreated) {

            // Generate JWToken

            const token = generateJsonWebToken(userCreated._id, res);
            console.log("user created: ", userCreated);

            // saving users

            await userCreated.save();

            console.log("User Registered Successfully")
            res.status(201).json({
                message: "User Registered Successfully",
                token: token
            })

        }



    } catch (error) {
        console.log("Error while creating new user : ", error.message);

    }
}

// login function

const loginUser = async (req, res) => {

    try {

        const { uname, password } = req.body;

        const userPresent = await newUser.findOne({ uname });

        const checkingHashedPassword = await bcryptjs.compare(password, userPresent.password);

        if (!checkingHashedPassword) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }


        if (checkingHashedPassword) {


            // generating token after successful login

            const token = generateJsonWebToken(userPresent._id, res); // passing two parameters first one is userId, secondone is res
            console.log("Generated JWT Token:", token);

            
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/',
                credentials: 'include'
              });  


            console.log("Login Successful");

            res.status(201).json({
                message: "Login Successful",
                _id: userPresent._id,
                token: token,
                fullname: userPresent.name,
                email: userPresent.email,
                profilePic: userPresent.profilepic

            })

        }


    } catch (error) {

        console.log("Error while Accessing Login function : ", error.message);

    }

}

// logout function

const logoutUser = (req, res) => {

    try {

        res.cookie("jwtoken", "", {
            maxAge: 0
        })

        console.log("User Logout Successfully...")

        res.status(201).json({
            message: "Logout Successfully"
        })

    } catch (error) {
        console.log("Error while Logout : ", error.message)

    }
}


module.exports = { loginUser, logoutUser, signupUser }

