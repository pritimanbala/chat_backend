import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'chatApp' }); //the db name actually helps you to select the database
    console.log('connected');
  } catch (err) {
    console.log('failed to connect');
    console.log(err.message);
    process.exit(1);
  }
};
