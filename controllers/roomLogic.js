import roomLogic from '../models/roomLogic.js';

export const createRoom = async (req, res) => {
  // take the values from the post request
  try {
    const { room_code, password, username } = req.body;
    console.log('this thing is working');
    // check that if the roomLogic already exists or not. if there, return status 400 roomLogic already exists
    const exists = await roomLogic.findOne({ room_code });
    if (exists) {
      return res.status(400).json({ success: false, message: 'roomLogic already there' });
    }
    // create a new constant roomLogic and initially keep messages empty
    const newRoom = new roomLogic({
      room_code,
      password,
      username,
      messages: [],
    });
    console.log(newRoom);
    // then save the object according the schema
    await newRoom.save();
    // return success json
    return res.status(200).json({
      success: true,
      message: 'successfully created the roomLogic',
      data: newRoom,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  // catch block starts here and console whats the error and then return the error
};

export const Login = async (req, res) => {
  try {
    // make a object for the by taking the data from the login page
    const { room_code, password, username } = req.query; //for post body will be there, but for get, query will be there
    //check the user if they exist or not
    const Room = await roomLogic.findOne({ room_code });
    // if exist, check password and and roomLogic code
    if (!Room) {
      return res.status(400).json({ success: false, message: 'error in finding roomLogic' });
    }

    if (Room.password === password) {
      if (Room.username !== username) {
        Room.members.push(username);
        await Room.save();
      }
      // if the user there(check from the member or the username), then return the user also to the website, if not, add the user to the list of members
      return res
        .status(200)
        .json({ success: true, message: 'success in finding roomLogic', data: Room });
      // make a success request saying, everything is fine
    } else {
      return res.status(400).json({ success: false, message: 'user not found' });
    }
  } catch (error) {
    console.log('error in logging', error);
    return res.status(400).json({ success: false, message: error.message });
  }
  // create a catch block also saying error in finding the user
};
