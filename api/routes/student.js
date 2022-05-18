const express = require("express");
const StudentController = require("../controllers/StudentController");
const studentRouter = express.Router();

studentRouter.post("/register", StudentController.registerUser);
studentRouter.post("/login", StudentController.loginUser);

module.exports = studentRouter;
