import mongoose from "mongoose";
import dotenv from "dotenv";
import { ServerApiVersion } from 'mongodb' ;
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/myapp";
    await mongoose.connect(mongoURI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit if something bad happend
  }
};

export default connectDB;
