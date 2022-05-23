const Teacher = require("../models/Teacher");
const {
  errorResponse,
  hashPassword,
  createToken,
  comparePasswords,
  validateLoginDetails,
  validateTeacherDetails,
} = require("../../helpers/utils");

class TeacherController {
  /**
   * @description -This method will register the user
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - Access token
   */
  static registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const { error } = validateTeacherDetails(req.body);
      // Validate data
      if (error) {
        const errMessage = error.details[0].message;
        return errorResponse(res, 400, errMessage, "teacher");
      }
      // Check email exist or not
      const emailExist = await Teacher.findOne({ email });
      if (emailExist) {
        return errorResponse(res, 409, "The email already exists.", "email");
      }
      // Hash the password and register
      const hashedPassword = await hashPassword(password);
      req.body.password = hashedPassword;
      const newTeacher = new Teacher(req.body);
      await newTeacher.save();
      // Create auth token
      delete req.body.password;
      const token = createToken(req.body);
      return res.status(200).json({
        accessToken: token,
        teacher: req.body,
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
        return errorResponse(res, 400, errMessage, "teacher-login");
      }
      // Check email exist or not
      const teacher = await Teacher.findOne({ email });
      if (!teacher) {
        return errorResponse(res, 400, "The email doesn't exist", "email");
      }
      // Match the password and login if matched
      const match = await comparePasswords(password, teacher.password);
      if (match) {
        const registeredUser = teacher._doc;
        delete registeredUser.password;
        const token = createToken(registeredUser);

        res.status(200).json({
          accessToken: token,
          teacher: registeredUser,
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

  /**
   * @description -This method will fetch teacher profile
   * @param {object} req - The request payload
   * @param {object} res - Response from server
   * @returns {object} - Access token and profile
   */
  static fetchProfile = async (req, res) => {
    const { _id: userId } = req.user;
    try {
      const teacher = await Teacher.findById(userId);
      res.status(200).json({
        accessToken: token,
        teacher,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
}

module.exports = TeacherController;
