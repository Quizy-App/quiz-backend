const express = require("express");
const TeacherController = require("../controllers/TeacherController");
const teacherRouter = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
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
 * /teacher/register:
 *   post:
 *     summary: Register a teacher
 *     description: This will a register a teacher to the app
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
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
 *                 teacher:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 */
teacherRouter.post("/register", TeacherController.registerUser);
/**
 * @swagger
 * /teacher/login:
 *   post:
 *     summary: Login a teacher
 *     description: This will a login a teacher to the app
 *     tags: [Teacher]
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
 *                 teacher:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 */
teacherRouter.post("/login", TeacherController.loginUser);

module.exports = teacherRouter;
