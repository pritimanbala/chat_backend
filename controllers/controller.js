import roomLogic from '../models/roomLogic.js';

export const sendMessage = async (req, res) => {
  try {
    const { room_code, username, message } = req.body;
    const Room = await roomLogic.findOne({ room_code });
    Room.messages.push({ username, message });
    await Room.save();
    return res
      .status(200)
      .json({ success: true, message: 'success in sending the request', data: Room });
  } catch (error) {
    console.log('error in sending message', error);
    return res.status(500).json({ success: false, message: 'error in sending the request' });
  }
};
