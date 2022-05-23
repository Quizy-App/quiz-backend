const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
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

const CourseSubject = mongoose.model("CourseSubject", subjectSchema);
module.exports = CourseSubject;
