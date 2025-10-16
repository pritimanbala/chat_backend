import express from 'express';
import { connectDB } from './connection/connector.js';
import chatRouter from './middleware/chat.js';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import iniSocket from './socket/iniSocket.js';
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://https://chat-frontend-tau-gray.vercel.app/',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors());

connectDB().then(() => {
  iniSocket(io);
  app.listen(3000, () => {
    console.log('server is mostly running dw');
  });
});

app.use('/api', chatRouter);
