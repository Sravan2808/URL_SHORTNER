import express from "express";
import dotenv from "dotenv";
dotenv.config("./.env");
import connectDB from "./src/config/mongo_config.js";
import { nanoid } from "nanoid";
import urlSchema from "./src/models/short_url.model.js"
import short_url from "./src/routes/short_url.route.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import errorHandler from "./src/utils/errorHandler.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/create",short_url);

app.use("/:id", redirectFromShortUrl);

app.use(errorHandler)

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on  http://localhost:3000");
});
