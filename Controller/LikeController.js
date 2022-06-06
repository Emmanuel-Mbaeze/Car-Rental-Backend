// const LikeModel = require("../model/LikeModel");
// const userModel = require("../model/userModel");
// const contentModel = require("../model/ContentModel");
// const mongoose = require("mongoose");

// // const createLike = async (req, res) => {
// //   try {
// //     const user = await LikeModel.findById(req.params.id);
// //     const likedBefore = await LikeModel.findById(req.params.id);
// //     const getContent = await contentModel.findById(req.params.content);
// //     const likeData = await new LikeModel({ _id: req.params.id });

// //     likeData = getContent;
// //     likeData.save();

// //     getContent.content.push(mongoose.Types.ObjectId(likeData._id));
// //     getContent.save();

// //     res.status(201).json({
// //       status: "like added",
// //     });
// //   } catch (error) {
// //     res.status(404).json({
// //       message: error.message,
// //       status: "error liking",
// //     });
// //   }
// // };

// const allLike = async (req, res) => {
//   try {
//     const Alllike = await LikeModel.find();
//     res.status(201).json({
//       status: " gotten all like",
//       data: Alllike,
//     });
//   } catch (error) {
//     res.status(404).json({
//       message: error.message,
//       status: "error getting all like",
//     });
//   }
// };

// const ItemLike = async (req, res) => {
//   try {
//     const DataS = await contentModel.findById(req.params.content);
//     res.status(200).json({
//       status: "succes",
//       data: DataS,
//     });
//   } catch (error) {
//     res.status(404).json({
//       message: error.message,
//       status: "error ",
//     });
//   }
// };
// const getItemLike = async (req, res) => {
//   try {
//     const DataS = await contentModel
//       .findById(req.params.content)
//       .populate(like);
//     res.status(200).json({
//       status: "succes",
//       data: DataS,
//     });
//   } catch (error) {
//     res.status(404).json({
//       message: error.message,
//       status: "error",
//     });
//   }
// };

// const deleteLike = async (req, res) => {
//   try {
//     const likeData = await contentModel.findById(req.params.content);
//     const remove = await LikeModel.findByIdAndDelete(req.params.like);

//     likeData.like.pull(remove);
//     likeData.save();

//     res.status(204).json({});
//   } catch (error) {
//     res.status(404).json({
//       message: error.message,
//       status: "error deleting",
//     });
//   }
// };
// // const createLike = async (req,res)=>{
// //     try {

// //     } catch (error) {
// //         res.status(404).json({
// //             message:error.message,
// //             status:"error liking"
// //         })
// //     }
// // }

// module.exports = {
//   createLike,
//   allLike,
//   deleteLike,
//   getItemLike,
//   ItemLike,
// };
