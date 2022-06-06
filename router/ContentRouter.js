const { made } = require("../utils/multer");
const express = require("express");
const router = express.Router();
const {
  deleteContent,
  createContent,
  singleallContent,
  oneContent,
  SearchContent,
  allContent,
} = require("../Controller/ContentController");
router.route("/").get(allContent);
router.route("/:id/:content").get(oneContent);
router.route("/:id/:content").delete(deleteContent);
router.route("/:id").post(made, createContent);
router.route("/:id").get(singleallContent);
router.route("/search").get(SearchContent);

module.exports = router;
