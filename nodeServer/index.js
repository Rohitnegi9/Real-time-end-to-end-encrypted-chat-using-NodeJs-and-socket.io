// Node server which will handle socket io connection

const io = require('socket.io')(9000, {
    cors: {
      origin: '*',
    }
  });

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', names => {  
     //console.log(names);    
     users[socket.id] = names;
     socket.broadcast.emit('user-joined', names);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {messages: message , names: users[socket.id]})
    });
    

    socket.on('disconnect', message=> {
      socket.broadcast.emit('left', users[socket.id]);
      delete users[socket.id];
    })

})

