import express from "express";
import dotenv from "dotenv";
dotenv.config("./.env");
import connectDB from "./src/config/mongo_config.js";
import { nanoid } from "nanoid";
import urlSchema from "./src/models/shorturl.model.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/create", (req, res) => {
  const {url} = req.body;
  const shortUrl = nanoid(7);
  const newUrl = new urlSchema({
    full_url:url,
    short_url:shortUrl,
  })
  newUrl.save();
  res.json({message:"URL created successfully",shortUrl:shortUrl})
});

app.get("/:id",async(req,res)=>{
    const {id} = req.params
    const url = await urlSchema.findOne({
        short_url:id
    })
    if(url){
        res.redirect(url.full_url);
    }
    else{
        res.status(404).json({message:"URL not found"})
    }
})

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on  http://localhost:3000");
});
