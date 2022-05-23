const express = require("express");
const StudentController = require("../controllers/StudentController");
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
 *
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

module.exports = studentRouter;
