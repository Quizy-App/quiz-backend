const mongoose = require("mongoose");

const yearSchema = mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const CourseYear = mongoose.model("CourseYear", yearSchema);
module.exports = CourseYear;
