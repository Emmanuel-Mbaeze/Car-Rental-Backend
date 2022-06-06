const { upload } = require("../utils/multer");
const express = require("express");
const router = express.Router();
const {
  signUpAdmin,
  SignupUser,
  verifyAdmin,
  verifyUser,
  deleteUser,
  updateUser,
  oneUser,
  signInUser,
  allUser,
} = require("../Controller/userController");
router.route("/").get(allUser);
router.route("/signin").post(signInUser);
router.route("/:id").get(oneUser).delete(deleteUser).patch(updateUser);
router.route("/register").post(upload, SignupUser);
router.route("/register-Admin").post(upload, signUpAdmin);
router.route("/:id/:token").get(verifyUser);
router.route("/admin/:id/:token").post(verifyAdmin);
module.exports = router;
