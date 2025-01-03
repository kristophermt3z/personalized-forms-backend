import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import routes from "../src/routes/index.routes";
/* import multer from "multer";
 */import ServerlessHttp from "serverless-http";
import connectDB from "../src/config/database";
import dotenv from "dotenv";
dotenv.config();

const app = express();
/* const storage = multer.memoryStorage(); */
/* const upload = multer({ storage: storage });
 */
const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/.netlify/functions/index" : "";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://personalized-forms-kristopher.netlify.app",
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:4200",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
/* app.use(cors()); */

/* app.use(upload.single("image")); */

app.use(basePath, routes);

if (!isProduction) {
  app.listen(8001, () => {
    console.log(`Listening on http://localhost:8001${basePath}`);
  });
}

connectDB();

const handler = ServerlessHttp(app);

module.exports.handler = async (event: any, context: any) => {
  const result = await handler(event, context);
  return result;
};
