const port = 1202;
const hostname = '127.0.0.1';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let usersOnline = 0;

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

// io connect
io.on('connection', function (socket) {
    usersOnline++;

    // chat message
    socket.on('chat message', (msg) => io.emit('chat message', msg));

    // disconnect
    socket.on('disconnect', () => usersOnline--);    
});

http.listen(port, hostname, () => console.log(`Listener on http:${hostname}:${port}`));