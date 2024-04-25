const express = require('express')
const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');

const useRouths = require('../backend/routes/auth.route.js');
const messageRouths = require('../backend/routes/messages.route.js');
const usersRouths = require('../backend/routes/users.route.js');
const connectToMongodb = require('./db/mongooseConnect.js');
const cors = require('cors');
const { app, server } = require('./socket/socket.js');

const PORT = process.env.PORT || 5000;

// const app = express();


app.use(cors({
    origin: "https://globalchatting.netlify.app",
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(express.json()) // accepting request from req.body or frontend in the form of json payload, it's the middleware

app.use(cookieParser());

app.use('/api/auth', useRouths); // all routes for login, signup, logout
app.use('/api/messages', messageRouths); // all routes for messages
app.use('/api/users', usersRouths); // all users route except current user

server.listen(PORT, () => {
    connectToMongodb(); // connecting the mongodb database
    console.log(`server is Running on port number ${PORT}`)

}
)
