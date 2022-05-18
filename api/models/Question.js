const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  marks: {
    type: String,
    required: true,
  },
  subjectId: {
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
