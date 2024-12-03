import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { routes } from "../src/routes";
import multer from "multer";
import serverless from "serverless-http";

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
//app.use(cors());

app.use(upload.single("archivo"));

routes(app);

// local
app.listen(8001, () => {
  console.log("Listening to port 8001");
});

//production
app.use("/.netlify/functions/index", routes);
export const handler = serverless(app);
