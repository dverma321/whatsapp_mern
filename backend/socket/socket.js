const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://globalchatting.netlify.app",
        methods: ['GET', 'POST'],
        credentials: true
    }
});

const userSocketMap = {}; // {userId: socket.id}

io.on("connect", (socket) => {

    console.log("a user connected ", socket.id)

    const userId = socket.handshake.query.userId; // check login user

    if(userId!= "undefined")
    {
        userSocketMap[userId] = socket.id;
    }

    // io.emit() is used to send events to all the connected clients

    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // here getOnlineUsers could be any name
    


    socket.on("disconnect", () => {
        console.log("user disconnected : ", socket.id);
        
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // here getOnlineUsers could be any name


    })

})

module.exports = { app, server, io, getReceiverSocketId };

// Define the getReceiverSocketId function after module.exports
function getReceiverSocketId(receiveId) {
    return userSocketMap[receiveId];
}
