const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');
const cors = require('cors');

const useRouths = require('../backend/routes/auth.route.js');
const messageRouths = require('../backend/routes/messages.route.js');
const usersRouths = require('../backend/routes/users.route.js');
const connectToMongodb = require('./db/mongooseConnect.js');
const { app, server } = require('./socket/socket.js');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "https://globalchatting.netlify.app",
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Authorization', 'Content-Type', 'Access-Control-Allow-Origin'],
}));



app.use('/api/auth', useRouths);
app.use('/api/messages', messageRouths);
app.use('/api/users', usersRouths);

server.listen(PORT, () => {
    connectToMongodb();
    console.log(`server is Running on port number ${PORT}`);
});
