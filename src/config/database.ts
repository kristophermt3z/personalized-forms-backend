import { DataSource } from "typeorm";
import { Template } from "../entities/Template.entity";
import { User } from "../entities/user.entity";

import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from 'mongodb' ;
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST, // Leer desde variables de entorno
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: true,
  entities: [User, Template],
});


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
    process.exit(1); // Salir si hay un error
  }
};

export default connectDB;
