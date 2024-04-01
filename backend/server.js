const express = require('express')
const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');

const useRouths = require('../backend/routes/auth.route.js');
const messageRouths = require('../backend/routes/messages.route.js');
const usersRouths = require('../backend/routes/users.route.js');
const connectToMongodb = require('./db/mongooseConnect.js');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()) // accepting request from req.body or frontend in the form of json payload, it's the middleware
app.use(cookieParser());

app.use('/api/auth', useRouths); // all routes are available in single line of code
app.use('/api/messages', messageRouths); // all routes are available in single line of code
app.use('/api/users', usersRouths); // all routes are available in single line of code


app.listen(PORT, ()=> {
    connectToMongodb(); // connecting the mongodb database
    console.log(`server is Running on port number ${PORT}`)

}
)