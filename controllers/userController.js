const { exec } = require("../utils/db");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { firstname, lastname, email, username, telephone, password } =
    req.body;

  try {
    const usernameExists = await exec("Users.PROC_CheckUsername", {
      username,
    });

    if (usernameExists.recordset.length > 0) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: `Try a different username`,
      });
    }

    const hashPass = await bcrypt.hash(password, 8);

    await exec("users.PROC_InsertUser", {
      firstname,
      lastname,
      email,
      username,
      telephone,
      password: hashPass,
    });

    const token = jwt.sign({ email }, process.env.JWTKEY, {
      expiresIn: "24h",
    });

    return res.status(201).json({
      status: 201,
      success: true,
      message: `A user has been registered successfully`,
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

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailExists = await exec("Users.PROC_CheckEmail", {
      email,
    });

    if (emailExists.recordset.length > 0) {
      const user = emailExists.recordset[0];

      bcrypt
        .compare(password, user.password)
        .then(async function (result, error) {
          if (result) {
            const token = jwt.sign({ email: user.email }, process.env.JWTKEY, {
              expiresIn: "24h",
            });
            return res.status(201).json({
              status: 201,
              success: true,
              message: `logged in successfully`,
              token,
            });
          } else
            return res.status(401).json({
              status: 401,
              success: false,
              message: "Invalid credentials!",
            });
        });
    } else {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Invalid credentials!",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message,
    });
  }
};
