const users = [{}];

const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joined', ({ user }) => {
      users[socket.id] = user;
      console.log(`${user} has joined `);
      socket.broadcast.emit('userJoined', { user: "Admin", message: ` ${users[socket.id]} has joined` });
      socket.emit('welcome', { user: "Admin", message: `Welcome to the chat, ${users[socket.id]}` });
    });

    socket.on('message', ({ message, id }) => {
      io.emit('sendMessage', { user: users[id], message, id });
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` });
      console.log(`${users[socket.id]} left`);
      delete users[socket.id]; // Clean up after user leaves
    });
  });
};

module.exports = chatSocket;
