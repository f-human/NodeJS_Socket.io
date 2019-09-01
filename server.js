const PORT = 3000;
const server = require('http').createServer();

const io = require('socket.io')(server, {
    path: '/ChatHub'
});

io.on('connection', socket => {
    const query = socket.handshake.query;
    const user = query.user;

    console.log(`User ${user} conntected to the ChatHub`);
    io.emit('new user', { user });

    socket.on('chat message', msg => {
        console.log(`new message: ${msg}`);
        io.emit('chat message', msg);
    });
});

server.listen(PORT, _ => {
    console.log(`Voila! Head over http://localhost:${PORT}`);
});
