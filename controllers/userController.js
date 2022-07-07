const poolPromise = require("../database/config");
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

    const token = await jwt.sign({ email }, process.env.JWTKEY, {
      expiresIn: "24h",
    });

    return res.status(201).json({
      status: 201,
      success: true,
      user: { firstname, lastname, email, username, telephone },
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
      console.log(emailExists.recordset);
      // return res.status(401).json({
      //   status: 401,
      //   success: false,
      //   message: `Try a different username`,
      // });
    }

    const pool = await poolPromise();
    pool
      .request()
      .input("email", email)
      .execute("Users.PROC_CheckEmail", (error, result) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          const user = result.recordset[0];
          // Generate token
          console.log(user);
          bcrypt
            .compare(password, user.password)
            .then(async function (result, error) {
              if (result) {
                const token = await jwt.sign(
                  { email: user.email },
                  process.env.JWTKEY,
                  {
                    expiresIn: "24h",
                  }
                );
                res.status(201).json({
                  status: 201,
                  success: true,
                  message: `logged in successfully`,
                  results: user,
                  token,
                });
              } else
                res.status(401).json({
                  status: 401,
                  success: false,
                  message: "Invalid credentials!",
                  results: [email, password],
                });
            });
        }
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
