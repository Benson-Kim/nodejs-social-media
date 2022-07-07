const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsController");

const authMiddleware = require("../middlewares/auth.middlewares");

router.get("/", postsController.getAllPosts);
router.post("/create", postsController.createPost);
router.post("/comment", postsController.createComment);

module.exports = router;
