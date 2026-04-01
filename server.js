import express from 'express';
import { connectDB } from './connection/connector.js';
import chatRouter from './middleware/chat.js';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import iniSocket from './socket/iniSocket.js';
const app = express();
const server = createServer(app);

// Configure CORS for Express
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

connectDB().then(() => {
  iniSocket(io);
  
  // Make io available to routes
  app.set('io', io);
  
  server.listen(3001, () => {
    console.log('server is mostly running dw on port 3001');
  });
});

app.use('/api', chatRouter);
