const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questionNo: {
    type: Number,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  subjectId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
