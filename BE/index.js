const { Socket } = require('dgram');
const express = require('express');
const port = 8080;
const http = require('http');
const {Server} = require('socket.io');
const app = express();

const httpServer = http.createServer(app);
const webSocketServer = new Server(httpServer)

httpServer.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

const DEFAULT_ROOM = 'general'; // Default room for users to join initially


webSocketServer.on('connection', (socket) => {
    console.log('A user connected');

    socket.join(DEFAULT_ROOM);


    // Handle errors
    socket.on('error', (error) => {
        console.error('WebSocket error:', error);


    });

    socket.emit("send","Hii I'm Jarvis from Server ")

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });





    // Listen for 'chatMessage' event from the client
    socket.on('chatMessage', ({message,room}) => {
        console.log('Message received:', message);
    
        // Broadcast the message to all connected clients
        socket.to(room).emit('chatMessage', message);
    
        // Broadcast the message to all clients in the same room
        socket.to(DEFAULT_ROOM).emit('chatMessage', message);
    });

    socket.on('joinRoom', (room) => {
        socket.join(room); // Join the requested room
        console.log(`User joined room: ${room}`);
    });

    // Listen for 'leaveRoom' event from client
    socket.on('leaveRoom', (room) => {
        socket.leave(room); // Leave the specified room
        console.log(`User left room: ${room}`);
    });

});

webSocketServer.on('error', (error) => {
    console.error('WebSocket server error:', error);
});
