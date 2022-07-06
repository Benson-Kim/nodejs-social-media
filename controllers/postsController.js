const poolPromise = require("../database/config");

const {} = require("../");

exports.createPost = async (req, res) => {
  const { content, userId, createdAt } = req.body;
  try {
    const pool = await poolPromise();
    pool
      .request()
      .input("content", content)
      .input("userId", userId)
      .execute("Posts.PROC_InsertPost", (error, result) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          return res.status(201).json({
            user: { userId, content, createdAt },
            message: `A post has been created a successfully`,
          });
        }
      });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const pool = await poolPromise();
    pool.request().execute("Posts.PROC_GetPosts", function (err, results) {
      if (err) {
        res.status(500).send(error.message);
      } else {
        return res.status(201).json({
          message: `Posts retrieved successfully`,
          results: results,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { userId, postId, content, createdAt } = req.body;
    const pool = await poolPromise();
    pool
      .request()
      .input("userId", userId)
      .input("postId", postId)
      .execute("Posts.checkUserComment", function (error, results) {
        if (error) {
          res.status(500).send(error.message);
        } else if (results.recordset.length > 0) {
          res.status(401).json({
            status: 401,
            success: false,
            message: `The user already has a comment on this post`,
            data: results.recordset,
          });
        } else {
          pool
            .request()
            .input("userId", userId)
            .input("postId", postId)
            .input("content", content)
            .execute("Posts.PROC_InsertComment", function (error, results) {
              if (error) {
                res.status(500).send(error.message);
              } else {
                return res.status(201).json({
                  status: 201,
                  success: true,
                  message: `user with id ${userId} has commented on post with id ${postId} successfully`,
                  comment: { userId, postId, content, createdAt },
                });
              }
            });
        }
      });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
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
      message: error,
    });
  }
};
