const userModel = require("../model/userModel");
const verifiedModel = require("../model/Verifiedmodel");
// const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv");
const nodemailer = require("nodemailer");
const { findOne, findById } = require("../model/userModel");
const transport = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});
const allUser = async (req, res) => {
  try {
    const everyUser = await userModel.find();
    res.status(200).json({
      message: "all users",
      data: everyUser,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error loading all users",
    });
  }
};
const oneUser = async (req, res) => {
  try {
    const oneUser = await userModel.findById(req.params.id);
    res.status(200).json({
      message: "one user",
      data: oneUser,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error loading one user",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const removeUser = await userModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      data: removeUser,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error loading deleting users",
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const { fullname } = req.body;
    const user = await userModel.findById(req.params.id);
    if (user) {
      // await cloudinary.uploader.destroy(user.avatarID);
      // const image = await cloudinary.uploader.upload(req.file.path);
      const mainUser = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          fullname,
          // avatar: image.secure_url,
          // avatarID: image.public_id,
        },
        { new: true }
      );
      res.status(200).json({
        message: "edit complete",
        data: mainUser,
      });
    } else {
      res.status(404).json({
        message: "Error in updating",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
// const signUpUser = async (req, res) => {
//   try {
//     const { fullname, password, email } = req.body;
//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password, salt);
//     const image = await cloudinary.uploader.upload(req.file.path);
//     const user = await userModel.create({
//       email,
//       password: hashed,
//       fullname,
//       avatar: image.secure_url,
//       avatarID: image.public_id,
//       verifiedToken: myToken,
//     });
//     const token = await crypto.randomBytes(35).toString("hex");
//     const myToken = jwt.sign({ token }, process.env.SECRET, {
//       expiresIn: "1d",
//     });

//     await verifiedModel.create({
//       userID: user._id,
//       token: myToken,
//       _id: user._id,
//     });
//     const mailOptions = {
//       from: "no-reply@gmail.com",
//       to: email,
//       subject: "Account Verification",
//       html: `
// <h2> ${user.fullname} thanks for registering Click on the <a
// href="http://localhost:9108/api/user/${user._id}/${myToken}"
// >LINK</a> to verify account,link expires in 1 day</h2>
// `,
//     };
//     transport.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         console.log("Message not sent");
//       } else {
//         console.log("Message sent ", info.response);
//       }
//     });
//     res.status(200).json({
//       message: "Check inbox for verification",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
const SignupUser = async (req, res) => {
  try {
    const { fullname, password, email } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt);
    // const image = await cloudinary.uploader.upload(req.file.path);
    const mytoken = await crypto.randomBytes(44).toString("hex");
    const token = jwt.sign({ mytoken }, process.env.SECRET, {
      expiresIn: "1d",
    });
    const user = await userModel.create({
      fullname,
      password: hashed,
      email,
      // avatar: image.secure_url,
      // avatarID: image.public_id,
      verifiedToken: token,
    });
    await verifiedModel.create({
      token: token,
      userID: user._id,
      _id: user._id,
    });
    //     const mailOptions = {
    //       from: "no-reply@gmail.com",
    //       to: email,
    //       subject: "Account Verification",
    //       html: `<h2>Click on the <a
    // href="http://localhost:9108/api/user/${user._id}/${token}"
    // >Link</a> to verify account`,
    //     };
    //     transport.sendMail(mailOptions, (err, info) => {
    //       if (err) {
    //         console.log("message not sent");
    //       } else {
    //         console.log("message sent", info.response);
    //       }
    //     });
    res.status(201).json({
      message: user,
    });
  } catch (error) {
    console.log(error);
  }
};
const verifyUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      if (user.verifiedToken !== "") {
        await userModel.findByIdAndUpdate(
          user._id,
          {
            isVerify: true,
            isAdmin: false,
            verifiedToken: "",
          },
          { new: true }
        );
        await verifiedModel.findByIdAndUpdate(
          user._id,
          {
            userID: user._id,
            token: "",
          },
          { new: true }
        );
        res.status(200).json({
          message: "Verification complete proceed to signin",
        });
      } else {
        res.status(200).json({
          message: "user not verified yet",
        });
      }
    } else {
      res.status(200).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      message: "all users",
    });
  } catch (error) {
    res.status(404).json({
      message: "Error loading all users",
    });
  }
};
const signUpAdmin = async (req, res) => {
  try {
    const { fullname, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    // const image = await cloudinary.uploader.upload(req.file.path);
    const mytoken = await crypto.randomBytes(35).toString("hex");
    // const Admintoken = await crypto.randomBytes(4).toString("hex");
    const token = jwt.sign({ mytoken }, process.env.SECRET, {
      expiresIn: "1d",
    });
    const user = await userModel.create({
      email,
      password: hashed,
      fullname,
      // avatar: image.secure_url,
      // avatarID: image.public_id,
      verifiedToken: token,
      // OTP: Admintoken,
    });

    await verifiedModel.create({
      token: token,
      userID: user._id,
      _id: user._id,
    });
    //     const mailOptions = {
    //       from: "no-reply@gmail.com",
    //       to: email,
    //       subject: "Account Verification",
    //       html: `
    // <h2> ${user.fullname} thanks for registering Click on the <a
    // href="http://localhost:9108/api/user/${user._id}/${myToken}"
    // >LINK</a> to verify account,link expires in 1 day</h2>
    // <h2>This is your OTP <strong>${Admintoken}</strong> do not share with anyone</h2>
    // `,
    //     };
    //     transport.sendMail(mailOptions, (err, info) => {
    //       if (err) {
    //         console.log("Message not sent");
    //       } else {
    //         console.log("Message sent ", info.response);
    //       }
    //     });
    res.status(201).json({
      message: user,
    });
    console.log(
      ` This is your OTP ${Admintoken}</strong> do not share with anyone`
    );
  } catch (error) {
    console.log(error);
  }
};
const verifyAdmin = async (req, res) => {
  try {
    // const { mainOTP } = req.body;
    const user = await userModel.findById(req.params.id);
    if (user) {
      if (user.verifiedToken !== "") {
        await userModel.findByIdAndUpdate(
          user._id,
          {
            isVerify: true,
            isAdmin: true,
            verifiedToken: "",
            OTP: "",
          },
          { new: true }
        );
        await verifiedModel.findByIdAndUpdate(
          user._id,
          {
            userID: user._id,
            token: "",
          },
          { new: true }
        );
        res.status(200).json({
          message: "Verification complete proceed to signup",
        });
        // if (user.OTP === mainOTP) {
        //   await userModel.findByIdAndUpdate(
        //     user._id,
        //     {
        //       isVerify: true,
        //       isAdmin: true,
        //       verifiedToken: "",
        //       OTP: "",
        //     },
        //     { new: true }
        //   );
        //   await verifiedModel.findByIdAndUpdate(
        //     user._id,
        //     {
        //       userID: user._id,
        //       token: "",
        //     },
        //     { new: true }
        //   );
        //   res.status(200).json({
        //     message: "Verification complete proceed to signup",
        //   });
        // } else {
        //   res.status(200).json({
        //     message: "incorrect OTP",
        //   });
        // }
      } else {
        res.status(200).json({
          message: "verified yet",
        });
      }
    } else {
      res.status(200).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      message: "all users",
    });
  } catch (error) {
    res.status(404).json({
      message: "Error loading all users",
    });
  }
};
const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        // if (user.isVerify) {
        //   const token = jwt.sign(
        //     {
        //       _id: user._id,
        //       isVerify: user.isVerify,
        //       isAdmin: user.isAdmin,
        //     },
        //     process.env.SECRET,
        //     { expiresIn: "20m" }
        //   );
        //   const { password, ...info } = user._doc;
        //   res.status(200).json({
        //     message: `Welcome back ${user.fullname}`,
        //     data: { token, ...info },
        //   });
        // } else {
        //   if (user.OTP !== "") {
        //     const token = await crypto.randomBytes(35).toString("hex");
        //     const Admintoken = await crypto.randomBytes(4).toString("hex");
        //     const myToken = jwt.sign({ token }, process.env.SECRET, {
        //       expiresIn: "1d",
        //     });
        //     const mailOptions = {
        //       from: "no-reply@gmail.com",
        //       to: email,
        //       subject: "Account Verification",
        //       html: `
        //     <h2> ${user.fullname} thanks for registering Click on the <a
        //     href="http://localhost:9108/api/user/${user._id}/${myToken}"
        //     >LINK</a> to verify account,link expires in 1 day</h2>
        //     <h2>This is your OTP <strong>${Admintoken}</strong> do not share with anyone</h2>
        //     `,
        //     };
        //     transport.sendMail(mailOptions, (err, info) => {
        //       if (err) {
        //         console.log("Message not sent");
        //       } else {
        //         console.log("Message sent ", info.response);
        //       }
        //     });
        //     res.status(200).json({
        //       message: "Check inbox for verification",
        //     });
        //   } else {
        //     const token = await crypto.randomBytes(35).toString("hex");
        //     const myToken = jwt.sign({ token }, process.env.SECRET, {
        //       expiresIn: "1d",
        //     });
        //     const mailOptions = {
        //       from: "no-reply@gmail.com",
        //       to: email,
        //       subject: "Account Verification",
        //       html: `
        //     <h2> ${user.fullname} thanks for registering Click on the <a
        //     href="http://localhost:9108/api/user/${user._id}/${myToken}"
        //     >LINK</a> to verify account,link expires in 1 day</h2>
        //     <h2>This is your OTP <strong>${Admintoken}</strong> do not share with anyone</h2>
        //     `,
        //     };
        //     transport.sendMail(mailOptions, (err, info) => {
        //       if (err) {
        //         console.log("Message not sent");
        //       } else {
        //         console.log("Message sent ", info.response);
        //       }
        //     });
        //     res.status(200).json({
        //       message: "Check inbox for verification",
        //     });
        //   }
        // }
        const token = jwt.sign(
          {
            _id: user._id,
            isVerify: user.isVerify,
            isAdmin: user.isAdmin,
          },
          process.env.SECRET,
          { expiresIn: "20m" }
        );
        const { password, ...info } = user._doc;
        res.status(200).json({
          message: `Welcome back ${user.fullname}`,
          data: { token, ...info },
        });
      } else {
        res.status(400).json({
          message: "Incorrect password",
        });
      }
    } else {
      res.status(404).json({
        message: "user not found",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  allUser,
  oneUser,
  deleteUser,
  updateUser,
  SignupUser,
  verifyUser,
  signUpAdmin,
  verifyAdmin,
  signInUser,
};
