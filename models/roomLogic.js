import mongoose from 'mongoose';

// first we need to make the const
const createRoomSchema = new mongoose.Schema({
  room_code: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  members: [{ type: String, require: true }],
  messages: [
    {
      username: { type: String, required: true },
      message: { type: String, required: true },
    },
  ],
});
// then we need to export the schema
export default mongoose.model('roomLogic', createRoomSchema, 'rooms');
