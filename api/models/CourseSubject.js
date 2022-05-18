const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  yearId: {
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
