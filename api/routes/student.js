const express = require("express");
const StudentController = require("../controllers/StudentController");
const studentRouter = express.Router();

/**
 * @swagger
 * /student/register:
 *   post:
 *     summary: Register a student
 *     description: This will a register a student to the app
 *     responses:
 *       201:
 *         description: Access token with payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 student:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Student's name
 *                     email:
 *                       type: string
 *                     enrollmentNo:
 *                       type: string
 *                     branch:
 *                       type: string
 *                     year:
 *                       type: integer
 *                     createdOn:
 *                       type: string
 */
studentRouter.post("/register", StudentController.registerUser);
studentRouter.post("/login", StudentController.loginUser);

module.exports = studentRouter;
