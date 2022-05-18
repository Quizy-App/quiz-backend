const express = require("express");
const studentRouter = require("./routes/student");
const quizRouter = require("./routes/quiz");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.use("/student", studentRouter);
router.use("/quiz", authenticate, quizRouter);

module.exports = router;
