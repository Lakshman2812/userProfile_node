const express = require("express");

const { auth } = require("../middleware/auth");
const {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
} = require("../controllers/comment");
const Router = express.Router();

Router.post("/createcomment", auth, createComment);
Router.get("/getComment", auth, getAllComments);
Router.get("/getComment/:id", auth, getCommentById);
Router.put("/updateComment/:id", auth, updateComment);
Router.delete("/deleteComment/:id", auth, deleteComment);

module.exports = Router;
