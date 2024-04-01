const jwtoken = require('jsonwebtoken');
require('dotenv').config();

const generateJsonWebToken = (userId, res)=>  {

    if (!userId) {
        throw new Error('Missing userId');
    }

    const token = jwtoken.sign({ userId }, process.env.JWT_SecretKey, {
        expiresIn: '15d'
    })

    console.log("Generated JWT Token:", token);

    res.cookie('jwtoken', token, {
        httpOnly: 'true',
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: true
    });

}

module.exports = generateJsonWebToken;