const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required:true
    },
    image:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);
const Post = new mongoose.model("Post", postSchema);
module.exports = Post;
