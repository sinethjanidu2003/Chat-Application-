const express = require("express");
const app = express();
const router = express.Router();
const socketIo = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('chat message', (message,userId,randomColor,userName) => {
      io.emit('chat message', message,userId,randomColor,userName);
    });
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

app.use(express.static(__dirname + "/public"));

server.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

app.use(router);