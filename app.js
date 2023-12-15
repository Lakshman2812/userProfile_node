const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routers/user");
const postRouter=require("./routers/Post")
const commentRouter=require("./routers/comment")
const app = express();

app.use(cors());
app.use(express.json());
app.use('/user',userRouter)
app.use('/post',postRouter)
app.use('/comment',commentRouter)



const port = process.env.port || 4000;

const url = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(url, {})
  .then(() => {
    console.log("Database connected successfully!!😃😃");
  })
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`app is running on ${port}.`);
});
