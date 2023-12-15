const express = require("express");

const { auth } = require("../middleware/auth");
const {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/post");
const Router = express.Router();

Router.post("/createPost", auth, createPost);
Router.get("/getPost", auth, getAllPost);
Router.get("/getPost/:id", auth, getPostById);
Router.put("/updatePost/:id", auth, updatePost);
Router.delete("/deletePost/:id",auth,deletePost)

module.exports = Router;
