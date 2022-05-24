const CourseYear = require("../models/CourseYear");
const CourseSubject = require("../models/CourseSubject");
const {
  errorResponse,
  validateSubjectDetails,
  validateQuestion,
  validateAnswer,
  validateUpdateAnswer,
} = require("../../helpers/utils");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Quiz = require("../models/Quiz");

class QuizController {
  /**
   * @description -This method will fetch all years from database
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - Years
   */
  static fetchYears = async (req, res) => {
    const { _id: userId } = req.user;
    try {
      // Fetch subjects from year id
      const years = await CourseYear.find({ userId }).select("year");
      return res.status(200).json({
        message: "Years",
        years,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  /**
   * @description -This method will add an year to database
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - Access token
   */

  static addCourseYear = async (req, res) => {
    const { year } = req.body;
    const { _id: userId } = req.user;
    try {
      // Validate data
      if (!year) {
        return errorResponse(res, 400, "Enter year please", "course-year");
      }

      // Register the year
      const courseYear = new CourseYear({ year, userId });
      await courseYear.save();

      return res.status(201).json({
        message: "Year Saved",
        year: courseYear._doc.year,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  /**
   * @description -This method will add a subject to database
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - Access token
   */
  static addCourseSubject = async (req, res) => {
    const { _id: userId } = req.user;
    const newSubject = req.body;
    try {
      const { error } = validateSubjectDetails(newSubject);
      // Validate data
      if (error) {
        const errMessage = error.details[0].message;
        return errorResponse(res, 400, errMessage, "subject");
      }

      // Register the subject
      const subject = new CourseSubject({ ...newSubject, userId });
      await subject.save();

      return res.status(201).json({
        message: "Subject Saved",
        subject: subject._doc.name,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  /**
   * @description -This method will fetch all subjects from database
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - Subjects
   */
  static fetchSubjects = async (req, res) => {
    const { year } = req.params;
    const { _id: userId } = req.user;
    try {
      // Check for subject
      const isExist = await CourseSubject.exists({ year, userId });
      if (!isExist) {
        return errorResponse(
          res,
          400,
          "Subjects in this year not found",
          "subjects"
        );
      }
      // Fetch subjects from year id
      const subjects = await CourseSubject.find({ year, userId }).select(
        "-userId"
      );
      return res.status(200).json({
        message: "Subjects",
        subjects,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  /**
   * @description -This method will fetch single subject from database
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - Subject
   */
  static fetchSubject = async (req, res) => {
    const { subject: subjectId } = req.params;
    try {
      // Check for subject
      // const isExist = await CourseSubject.exists({ year, userId });
      // if (!isExist) {
      //   return errorResponse(
      //     res,
      //     400,
      //     "Subjects in this year not found",
      //     "subjects"
      //   );
      // }
      // Fetch subjects from year id
      const subject = await CourseSubject.findById(subjectId).select("-userId");
      return res.status(200).json({
        message: "Subject",
        subject,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  /**
   * @description -This method will add a question to database
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - new question
   */
  static addQuestion = async (req, res) => {
    try {
      const { _id: userId } = req.user;
      const { error } = validateQuestion(req.body);
      // Validate data
      if (error) {
        const errMessage = error.details[0].message;
        return errorResponse(res, 400, errMessage, "question");
      }

      const question = new Question({ ...req.body, userId });
      await question.save();

      return res.status(201).json({
        message: "Question Saved",
        data: {
          id: question._doc._id,
          question: question._doc.title,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  /**
   * @description -This method will fetch a question from database
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - Question
   */
  static fetchQuestion = async (req, res) => {
    const { subject, question_no } = req.query;
    const { _id: userId } = req.user;
    try {
      // Check for subject
      const isExist = await Question.exists({
        subjectId: subject,
        questionNo: question_no,
        userId,
      });
      if (!isExist) {
        return errorResponse(
          res,
          400,
          "Questions in this subject not found",
          "questions"
        );
      }
      // Fetch subjects from year id
      const questions = await Question.findOne({
        subjectId: subject,
        questionNo: question_no,
        userId,
      }).select("-userId");
      return res.status(200).json({
        message: "Question",
        questions,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  /**
   * @description -This method will add an answer specific to question in database
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - New answer
   */
  static addAnswer = async (req, res) => {
    const { _id: userId } = req.user;
    try {
      const { error } = validateAnswer(req.body);
      // Validate data
      if (error) {
        const errMessage = error.details[0].message;
        return errorResponse(res, 400, errMessage, "answer");
      }
      const answerData = req.body.map((ans) => ({ ...ans, userId }));
      const answers = await Answer.insertMany(answerData);
      console.log(answers);
      // await answer.save();

      return res.status(201).json({
        message: "Answer Saved",
        // answer: answer._doc.title,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  /**
   * @description -This method will fetch all the answers from database
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - Answers
   */
  static fetchAnswers = async (req, res) => {
    const { _id: userId } = req.user;
    const { question } = req.params;
    try {
      // Check for Answer
      const isExist = await Answer.exists({ questionId: question, userId });
      if (!isExist) {
        return errorResponse(
          res,
          400,
          "Answers for this question not found",
          "answers"
        );
      }
      // Fetch subjects from year id
      const answers = await Answer.find({ questionId: question, userId });
      return res.status(200).json({
        message: "Answers",
        answers,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  /**
   * @description -This method will update answer's choice
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - Message
   */
  static updateAnswer = async (req, res) => {
    const { question } = req.params;
    const { answerId } = req.body;
    try {
      // Check validity
      const { error } = validateUpdateAnswer(req.body);

      if (error) {
        const errMessage = error.details[0].message;
        return errorResponse(res, 400, errMessage, "answer_update");
      }

      // Fetch answers of this question
      const answers = await Answer.find({ questionId: question });
      const updatedAnswers = answers.map((answer) =>
        answer._doc._id.toString() === answerId
          ? { ...answer._doc, isPreferred: true }
          : { ...answer._doc, isPreferred: false }
      );

      // Again update all the answers
      // const savedAnswers = await Question.updateMany(
      //   { questionId: question },
      //   updatedAnswers
      // );
      // Update the answer
      const answerUpdate = await Answer.bulkWrite([
        {
          updateMany: {
            filter: { questionId: question, _id: !answerId },
            update: { isPreferred: false },
          },
        },
      ]);
      return res.status(200).json({
        message: "Answer Updated",
        // updatedAnswer,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  /**
   * @description -This method will allow student to give answer
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - Message
   */
  static attemptQuestion = async (req, res) => {
    const { _id: studentId } = req.user;
    const { answerId } = req.body;
    try {
      let correctAnswer = false,
        responseResult;
      // Check for Answer
      const answer = await Answer.findById(answerId);
      if (!answer) {
        return errorResponse(res, 400, "Answers not found", "answer");
      }
      const question = await Question.findById(answer.questionId);
      console.log(question);
      // Fetch specific subject result
      const previousResult = await Quiz.findOne({
        subjectId: question.subjectId,
        studentId,
      });

      const marksObtained = previousResult?.marksObtained || 0;
      // Check wether answer is correct or not
      if (answer.isPreferred) {
        // Answer is correct, give marks
        correctAnswer = true;
        const questionAttempt = {
          studentId,
          subjectId: question.subjectId,
          totalMarks: 10,
          marksObtained: marksObtained + 1,
        };
        responseResult = await Quiz.findOneAndUpdate(
          {
            studentId: questionAttempt.studentId,
            subjectId: questionAttempt.subjectId,
          },
          questionAttempt,
          {
            upsert: true,
            new: true,
          }
        );
      } else {
        correctAnswer = false;
      }
      return res.status(200).json({
        message: "Question Attempted",
        isCorrect: correctAnswer,
        result: responseResult,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  /**
   * @description -This method will allow student to fetch results
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - Message
   */
  static fetchResults = async (req, res) => {
    const { subject } = req.params;
    const { _id: studentId } = req.user;
    try {
      const results = await Quiz.findOne({ subjectId: subject, studentId });
      res.status(200).json({
        message: "Quiz Results",
        results,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
}

module.exports = QuizController;
