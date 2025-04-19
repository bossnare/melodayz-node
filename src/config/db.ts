import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => { 
  try {
    // const uri = process.env.MONGO_URI || "mongodb://localhost:27017/melodayz"; raha dev mode dia mety // Default to local MongoDB if MONGO_URI is not set
    const uri = process.env.MONGO_URI // mety en prod 
    // check if uri is defined
    if (!uri) throw new Error("MONGO_URI is not defined in .env file");
    // Connect to MongoDB
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
}

export default connectDB;
