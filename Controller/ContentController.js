const userModel = require("../model/userModel");
const contentModel = require("../model/ContentModel");
const mongoose = require("mongoose");
// const cloudinary = require("../utils/cloudinary");

const allContent = async (req, res) => {
  try {
    const { pages, limit } = req.query;
    const everyContent = await contentModel
      .find()
      .limit(limit)
      .skip((pages - 1) * limit)
      .sort(-1);
    res.status(200).json({
      data: everyContent,
      message: "all contents",
      total: everyContent.length,
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};
const singleallContent = async (req, res) => {
  try {
    const singleContent = await userModel
      .findById(req.params.id)
      .populate("content");
    res.status(200).json({
      message: "singleall content",
      data: singleContent,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error loading one user",
    });
  }
};
const oneContent = async (req, res) => {
  try {
    const singleContent = await contentModel.findById(req.params.content);
    res.status(200).json({
      message: "one content",
      data: singleContent,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error loading one user",
    });
  }
};
const deleteContent = async (req, res) => {
  try {
    if (user.isVerify && user.isAdmin) {
      const user = await userModel.findById(req.params.id);
      const deleteData = await contentModel.findOneAndDelete(
        req.params.content
      );
      user.content.pull(deleteData);
      user.save();
      res.status(204).json({});
    } else {
      res.status(404).json({
        message: error.message,
        status: "access denied",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "error deleting",
    });
  }
};
const createContent = async (req, res) => {
  try {
    const {
      price,
      description,
      name,
      air,
      mileage,
      fuel,
      speed,
      power,
      mph,
      passengers,
      doors,
      gear,
      currency,
      model,
    } = req.body;
    // const image = await cloudinary.uploader.upload(req.file.path);

    const getUSer = await userModel.findById(req.params.id);
    const createContents = new contentModel({
      price,
      description,
      name,
      air,
      mileage,
      fuel,
      speed,
      power,
      mph,
      passengers,
      doors,
      gear,
      currency,
      model,
      // image: image.secure_url,
      // imageID: image.public_id,
    });
    createContents.user = getUSer;
    createContents.save();

    getUSer.content.push(mongoose.Types.ObjectId(createContents._id));
    getUSer.save();
    res.status(200).json({
      message: "items has been created",
      data: createContents,
    });
  } catch (error) {
    res.status(201).json({
      message: "items not created",
    });
  }
};
const SearchContent = async (req, res) => {
  try {
    const makeSearch = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { price: { $regex: req.query.search, $options: "i" } },
            { description: { $regex: req.query.search, $options: "i" } },
            { size: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const allContents = await ContentModel.find(makeSearch);
    res.status(200).json({
      message: "Content Created",
      data: allContents,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
// const allUser = async (req,res)=>{
//     try {
//         const everyUser = await contentModel.find()
//         res.status(200).json({
//             message:"all users",
//             data:everyUser
//         })
//     } catch (error) {
//         res.status(404).json({
//             message:"Error loading all users"
//         })
//     }
// }
module.exports = {
  allContent,
  singleallContent,
  deleteContent,
  oneContent,
  createContent,
  SearchContent,
};
