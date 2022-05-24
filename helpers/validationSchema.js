const Joi = require("joi");

const studentSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  email: Joi.string().min(5).max(100).email().required(),
  password: Joi.string().min(5).max(50).required(),
  enrollmentNo: Joi.string().min(10).max(12).required(),
  branch: Joi.string().required(),
  year: Joi.number().required(),
});

const teacherSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  email: Joi.string().min(5).max(100).email().required(),
  password: Joi.string().min(5).max(50).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(5).max(100).email().required(),
  password: Joi.string().min(5).max(50).required(),
});

const subjectSchema = Joi.object({
  name: Joi.string().min(3).required(),
  year: Joi.number().required(),
});

const questionSchema = Joi.object({
  title: Joi.string().min(3).required(),
  marks: Joi.number().required(),
  questionNo: Joi.number().required(),
  subjectId: Joi.string().required(),
});

const answerSchema = Joi.array().items(
  Joi.object({
    title: Joi.string().min(3).required(),
    isPreferred: Joi.boolean(),
    questionId: Joi.string().required(),
  })
);

const answerUpdateSchema = Joi.object({
  answerId: Joi.string().required(),
});

module.exports = {
  studentSchema,
  loginSchema,
  subjectSchema,
  teacherSchema,
  questionSchema,
  answerSchema,
  answerUpdateSchema,
};
