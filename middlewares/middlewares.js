exports.authPage = (permissions) => {
  return (req, res, next) => {
    const loggedin = req.body.isLoggedIn;
    if (permissions.includes(loggedin)) {
      next();
    } else {
      return res.status(401).json({
        message: "Make sure you are logged in",
      });
    }
  };
};

exports.authComment = (req, res, next) => {};
