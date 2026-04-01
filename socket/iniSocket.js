export default function iniSocket(io) {
  io.on('connection', (socket) => {
    console.log('User Connected', socket.id);
    //initial connction

    socket.on('join_room', (room_code) => {
      socket.join(room_code);
      console.log('success fully joined room ', room_code);
    });

    socket.on('send_message', (data) => {
      const { roomCode, message } = data;
      console.log('Message sent to room:', roomCode, message);
      io.to(roomCode).emit('receive_message', {
        room_code: roomCode,
        message: message
      });
    });

    socket.on('disconnect', () => {
      console.log('user Disconnected', socket.id);
    });
  });
}
