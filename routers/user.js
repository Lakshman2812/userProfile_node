const express = require("express");

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const {
  createUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  login,
  logout,
} = require("../controllers/user");
const { auth } = require("../middleware/auth");
const Router = express.Router();


Router.post("/register", createUser);
Router.get("/all-users",auth, getAllUser);
Router.get("/getUser/:id",auth, getUserById);
Router.delete("/deleteUser/:id",auth, deleteUser);
Router.put("/updateUser/:id",auth,updateUser);
Router.post("/login",login);

module.exports = Router;
