const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    PostId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Post"
    }
  },
  { timestamp: true }
);
const Comment = new mongoose.model("Comment", commentSchema);
module.exports = Comment;
