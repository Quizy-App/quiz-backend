const express = require("express");
const QuizController = require("../controllers/QuizController");
const quizRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Year:
 *       type: object
 *       properties:
 *         year:
 *           type: integer
 *     Subject:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         image:
 *           type: string
 *         year:
 *           type: integer
 *     Question:
 *       type: object
 *       properties:
 *         questionNo:
 *           type: integer
 *         title:
 *           type: string
 *         marks:
 *           type: integer
 *         subjectId:
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
 *     Result:
 *       type: object
 *       properties:
 *         studentId:
 *           type: string
 *         subjectId:
 *           type: string
 *         totalMarks:
 *           type: integer
 *         marksObtained:
 *           type: integer
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
 *             $ref: '#/components/schemas/Year'
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
 *                   type: integer
 */
quizRouter.post("/add_course_year", QuizController.addCourseYear);

/**
 * @swagger
 * /quiz/fetch_years:
 *   get:
 *     summary: Get years
 *     description: Fetch all the years
 *     tags: [Quiz]
 *     responses:
 *       200:
 *         description: All added years
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 years:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Year'
 */
quizRouter.get("/fetch_years", QuizController.fetchYears);

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
 *         description: An Year
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

/**
 * @swagger
 * /quiz/add_question:
 *   post:
 *     summary: Add questions
 *     description: Add questions of specific subject
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Message with question
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     question:
 *                       type: string
 */
quizRouter.post("/add_question", QuizController.addQuestion);

/**
 * @swagger
 * /quiz/fetch_questions:
 *   get:
 *     summary: Get questions
 *     description: Get questions of specific subject and question number
 *     tags: [Quiz]
 *     parameters:
 *       - in: query
 *         name: question_no
 *         schema:
 *           type: integer
 *         required: true
 *         description: Question number
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         required: true
 *         description: Subject Id
 *     responses:
 *       200:
 *         description: All questiions in this subject
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 question:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 */
quizRouter.get("/fetch_questions", QuizController.fetchQuestion);

/**
 * @swagger
 * /quiz/add_answer:
 *   post:
 *     summary: Add answer
 *     description: Add answers of specific question
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Answer'
 *     responses:
 *       201:
 *         description: Message with answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 answer:
 *                   type: string
 */
quizRouter.post("/add_answer", QuizController.addAnswer);

/**
 * @swagger
 * /quiz/fetch_answers/{question}:
 *   get:
 *     summary: Get questions
 *     description: Get questions of specific subject
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: question
 *         schema:
 *           type: string
 *         required: true
 *         description: Question Id
 *     responses:
 *       200:
 *         description: All answers in this question
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 answers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Answer'
 */
quizRouter.get("/fetch_answers/:question", QuizController.fetchAnswers);

// /**
//  * @swagger
//  * /quiz/update_answers/{question}:
//  *   patch:
//  *     summary: Update answers
//  *     description: Update answers of specific question
//  *     tags: [Quiz]
//  *     parameters:
//  *       - in: path
//  *         name: question
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Question Id
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               answerId:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Message with answer
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                 answer:
//  *                   type: string
//  */
// quizRouter.patch("/update_answers/:question", QuizController.updateAnswer);

/**
 * @swagger
 * /quiz/attempt_question:
 *   post:
 *     summary: Attempt a question
 *     description: Attempt question to get specific marks
 *     tags: [Quiz]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message regarding correct answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 isCorrect:
 *                   type: boolean
 */
quizRouter.post("/attempt_question", QuizController.attemptQuestion);

/**
 * @swagger
 * /quiz/fetch_results/{subject}:
 *   get:
 *     summary: Get results
 *     description: Get results of specific subject
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: subject
 *         schema:
 *           type: string
 *         required: true
 *         description: Subject Id
 *     responses:
 *       200:
 *         description: Results for student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 results:
 *                   $ref: '#/components/schemas/Result'
 */
quizRouter.get("/fetch_results/:subject", QuizController.fetchResults);

/**
 * @swagger
 * /quiz/fetch_subject/{subject}:
 *   get:
 *     summary: Get subject
 *     description: Get subject of specific subject id
 *     tags: [Quiz]
 *     parameters:
 *       - in: path
 *         name: subject
 *         schema:
 *           type: string
 *         required: true
 *         description: Subject Id
 *     responses:
 *       200:
 *         description: Result for subject
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 subject:
 *                   $ref: '#/components/schemas/Subject'
 */
quizRouter.get("/fetch_subject/:subject", QuizController.fetchSubject);

module.exports = quizRouter;
