const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsController");

router.get("/", postsController.getAllPosts);
router.post("/create", postsController.createPost);
router.post("/comment", postsController.createComment);

module.exports = router;
