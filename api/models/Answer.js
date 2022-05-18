const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isPreferred: {
    type: Boolean,
    default: false,
  },
  questionId: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
