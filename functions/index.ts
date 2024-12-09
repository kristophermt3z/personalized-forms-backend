import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import routes from "../src/routes/routes";
import multer from "multer";
import ServerlessHttp from "serverless-http";
import connectDB, { AppDataSource } from "../src/config/database";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/.netlify/functions/index" : "";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:4200",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
/* app.use(cors()); */

app.use(upload.single("archivo"));

app.use(basePath, routes);

if (!isProduction) {
  app.listen(8001, () => {
    console.log(`Listening on http://localhost:8001${basePath}`);
  });
}

connectDB();

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
  });

const handler = ServerlessHttp(app);

module.exports.handler = async (event: any, context: any) => {
  const result = await handler(event, context);
  return result;
};
