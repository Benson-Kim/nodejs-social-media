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
    res.status(500).json(error);
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
    res.status(500).json(error);
  }
};
