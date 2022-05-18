const Student = require("../models/Student");
const {
  validateStudentDetails,
  errorResponse,
  hashPassword,
  createToken,
  comparePasswords,
  validateLoginDetails,
} = require("../../helpers/utils");

class StudentController {
  /**
   * @description -This method will register the user
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - Access token
   */
  static registerUser = async (req, res) => {
    const { email, password, enrollmentNo } = req.body;
    try {
      const { error } = validateStudentDetails(req.body);
      // Validate data
      if (error) {
        const errMessage = error.details[0].message;
        return errorResponse(res, 400, errMessage, "student");
      }
      // Check email exist or not
      const emailExist = await Student.findOne({ email });
      if (emailExist) {
        return errorResponse(res, 409, "The email already exists.", "email");
      }
      // Check enrollment
      const rollNoExist = await Student.findOne({ enrollmentNo });
      if (rollNoExist) {
        return errorResponse(
          res,
          409,
          "The enrollment no already exists.",
          "enrollmentNo"
        );
      }
      // Hash the password and register
      const hashedPassword = await hashPassword(password);
      req.body.password = hashedPassword;
      const newStudent = new Student(req.body);
      await newStudent.save();
      // Create auth token
      delete req.body.password;
      const token = createToken(req.body);
      return res.status(200).json({
        accessToken: `Bearer ${token}`,
        student: req.body,
        expires_in: "24h",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  /**
   * @description -This method will login user
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - Access token
   */
  static loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const { error } = validateLoginDetails(req.body);
      // Validate data
      if (error) {
        const errMessage = error.details[0].message;
        return errorResponse(res, 400, errMessage, "student-login");
      }
      // Check email exist or not
      const student = await Student.findOne({ email });
      if (!student) {
        return errorResponse(res, 400, "The email doesn't exist", "email");
      }
      // Match the password and login if matched
      const match = await comparePasswords(password, student.password);
      if (match) {
        const registeredUser = student._doc;
        delete registeredUser.password;
        const token = createToken(registeredUser);

        res.status(200).json({
          accessToken: `Bearer ${token}`,
          student: registeredUser,
          expires_in: "24h",
        });
      } else {
        return errorResponse(res, 400, "Email or Password is invalid.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
}

module.exports = StudentController;
