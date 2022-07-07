const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsController");

const authMiddleware = require("../middlewares/auth.middlewares");

router.get("/", postsController.getAllPosts);
router.post("/create", authMiddleware, postsController.createPost);
router.post("/comment", authMiddleware, postsController.createComment);

module.exports = router;
