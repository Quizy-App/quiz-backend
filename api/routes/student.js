const express = require("express");
const StudentController = require("../controllers/StudentController");
const authenticate = require("../../middlewares/authenticate");
const studentRouter = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         enrollmentNo:
 *           type: string
 *         branch:
 *           type: string
 *         year:
 *           type: integer
 *     UserLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     Answer:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         isPreferred:
 *           type: boolean
 *         questionId:
 *           type: string
 */

/**
 * @swagger
 * /student/register:
 *   post:
 *     summary: Register a student
 *     description: This will a register a student to the app
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
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
 */
studentRouter.post("/register", StudentController.registerUser);
/**
 * @swagger
 * /student/login:
 *   post:
 *     summary: Login a student
 *     description: This will a login a student to the app
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
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
 */
studentRouter.post("/login", StudentController.loginUser);

/**
 * @swagger
 * /student/profile:
 *   get:
 *     summary: Fetch student profile
 *     description: This will fetch profile for student
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: Access token with payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 */
studentRouter.get("/profile", authenticate, StudentController.fetchProfile);

/**
 * @swagger
 * /student/fetch_quiz/{subject}:
 *   get:
 *     summary: Fetch quizes
 *     description: This will fetch profile for student
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: subject
 *         schema:
 *           type: string
 *         required: true
 *         description: Subject Id
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Data limit
 *     responses:
 *       200:
 *         description: Question with choices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 question:
 *                   type: string
 *                 choices:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Answer'
 */
studentRouter.get(
  "/fetch_quiz/:subject",
  authenticate,
  StudentController.fetchQuizes
);

module.exports = studentRouter;
