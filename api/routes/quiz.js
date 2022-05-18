const express = require("express");
const QuizController = require("../controllers/QuizController");
const quizRouter = express.Router();

quizRouter.post("/add_course_year", QuizController.addCourseYear);
quizRouter.post("/add_subject", QuizController.addCourseSubject);
quizRouter.get("/fetch_subjects/:year", QuizController.fetchSubjects);
quizRouter.post("/add_question", QuizController.addQuestion);
quizRouter.get("/fetch_questions/:subject", QuizController.fetchQuestions);
quizRouter.post("/add_answer", QuizController.addAnswer);
quizRouter.get("/fetch_answers/:question", QuizController.fetchAnswers);
quizRouter.patch("/update_answer/:answer", QuizController.updateAnswer);
quizRouter.post("/attempt_question", QuizController.attemptQuestion);
quizRouter.get("/fetch_results", QuizController.fetchResults);

module.exports = quizRouter;
