const express = require("express");
const QuizController = require("../controllers/QuizController");
const quizRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         yearId:
 *           type: string
 *     Question:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         marks:
 *           type: string
 *         subjectId:
 *           type: string
 */

/**
 * @swagger
 * /quiz/add_course_year:
 *   post:
 *     summary: Add an year
 *     description: Teacher have to add an year first before adding subject
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               year:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message with the year
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 year:
 *                   type: string
 */
quizRouter.post("/add_course_year", QuizController.addCourseYear);

/**
 * @swagger
 * /quiz/add_subject:
 *   post:
 *     summary: Add a subject
 *     description: Teacher have to add a subject first before adding questions
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       201:
 *         description: Message with the subject
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 subject:
 *                   type: string
 */
quizRouter.post("/add_subject", QuizController.addCourseSubject);

/**
 * @swagger
 * /quiz/fetch_subjects/{year}:
 *   get:
 *     summary: Get subjects of specific year
 *     description: Fetch all the subject through year
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: string
 *         required: true
 *         description: An Year Id
 *     responses:
 *       200:
 *         description: All subjects in this year
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 subject:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subject'
 */
quizRouter.get("/fetch_subjects/:year", QuizController.fetchSubjects);
quizRouter.post("/add_question", QuizController.addQuestion);
quizRouter.get("/fetch_questions/:subject", QuizController.fetchQuestions);
quizRouter.post("/add_answer", QuizController.addAnswer);
quizRouter.get("/fetch_answers/:question", QuizController.fetchAnswers);
quizRouter.patch("/update_answer/:answer", QuizController.updateAnswer);
quizRouter.post("/attempt_question", QuizController.attemptQuestion);
quizRouter.get("/fetch_results", QuizController.fetchResults);

module.exports = quizRouter;
