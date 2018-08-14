const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let usersOnline = 0;

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

// io connection
io.on('connection', function (socket) {

    usersOnline++;

    // chat message
    socket.on('chat message', (msg) => io.emit('chat message', msg));

    // disconnect
    socket.on('disconnect', () => usersOnline--);

    console.log(`a user connected. Current users online ${usersOnline}`);
});

http.listen(3000, () => console.log('listening on *:3000'));