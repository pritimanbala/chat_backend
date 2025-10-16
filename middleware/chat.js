import { sendMessage } from '../controllers/controller.js';
import { createRoom, Login } from '../controllers/roomLogic.js';

import express from 'express';

const chatRouter = express.Router();

//checking if the middleware is hit or not
chatRouter.use((req, res, next) => {
  console.log('router was hit');
  console.log('query', req.query);
  console.log('body', req.body);
  next();
});

chatRouter.post('/create', createRoom);
chatRouter.get('/login', Login);
chatRouter.post('/room', sendMessage);

export default chatRouter;
