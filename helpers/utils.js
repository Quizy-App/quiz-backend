const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  studentSchema,
  loginSchema,
  subjectSchema,
  questionSchema,
  answerSchema,
  answerUpdateSchema,
} = require("./validationSchema");
require("dotenv/config");

module.exports = {
  validateStudentDetails: (student) => {
    return studentSchema.validate(student);
  },
  validateLoginDetails: (student) => {
    return loginSchema.validate(student);
  },
  validateSubjectDetails: (subject) => {
    return subjectSchema.validate(subject);
  },
  validateQuestion: (question) => {
    return questionSchema.validate(question);
  },
  validateAnswer: (answer) => {
    return answerSchema.validate(answer);
  },
  validateUpdateAnswer: (answer) => {
    return answerUpdateSchema.validate(answer);
  },
  errorResponse: (res, status, message, field) => {
    return res.status(status).json({
      error: {
        status,
        message,
        field: field || "",
      },
    });
  },
  hashPassword: async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  },
  comparePasswords: async (password, userPassword) => {
    console.log(password, userPassword);
    const match = await bcrypt.compare(password, userPassword);
    return match;
  },
  createToken: (user) => {
    return jwt.sign(user, process.env.SECRET, { expiresIn: "1h" });
  },
};
