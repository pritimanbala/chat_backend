export default function iniSocket(io) {
  io.on('connection', (socket) => {
    console.log('User Connected', socket.id);
    //initial connction

    socket.on('join_room', (room_code) => {
      socket.join(room_code);
      console.log('success fully joined room ', room_code);
    });

    socket.on('send_message', (data) => {
      const { room_code } = data;
      io.to(room_code).emit('received message');
    });

    socket.on('disconnect', () => {
      console.log('user Disconnected', socket.id);
    });
  });
}
