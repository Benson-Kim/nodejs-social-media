const { exec } = require("../utils/db");

exports.createPost = async (req, res) => {
  const { content, userId } = req.body;
  try {
    await exec("Posts.PROC_InsertPost", {
      content,
      userId,
    });
    return res.status(201).json({
      post: { userId, content },
      message: `A post has been created a successfully`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const results = await exec("Posts.PROC_GetPosts");

    return res.status(201).json({
      message: `Posts retrieved successfully`,
      posts: results.recordset,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;
    // todo
    // check if user exists
    // check if post exists

    const commentResult = await exec("Posts.checkUserComment", {
      userId,
      postId,
    });

    if (commentResult.recordset.length > 0) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: `The user already has a comment on this post`,
      });
    }

    await exec("Posts.PROC_InsertComment", {
      userId,
      postId,
      content,
    });

    return res.status(201).json({
      status: 201,
      success: true,
      message: `commented successfully`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};

exports.createReply = async (req, res) => {
  try {
    const pool = await poolPromise();
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};
