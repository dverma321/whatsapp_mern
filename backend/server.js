const express = require('express')
const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');

const useRouths = require('../backend/routes/auth.route.js');
const messageRouths = require('../backend/routes/messages.route.js');
const usersRouths = require('../backend/routes/users.route.js');
const connectToMongodb = require('./db/mongooseConnect.js');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()) // accepting request from req.body or frontend in the form of json payload, it's the middleware
app.use(cookieParser());

app.use(cors(
    {
        origin:"http://localhost:5173",
        // origin:"https://findyourperfectmatch.netlify.app",
        methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // set the cookie true
        optionsSuccessStatus: 204     // Respond with a 204 status code for preflight requests
    }
));



app.use('/api/auth', useRouths); // all routes for login, signup, logout
app.use('/api/messages', messageRouths); // all routes for messages
app.use('/api/users', usersRouths); // all users route except current user


app.listen(PORT, ()=> {
    connectToMongodb(); // connecting the mongodb database
    console.log(`server is Running on port number ${PORT}`)

}
)